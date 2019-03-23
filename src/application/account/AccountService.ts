import {inject, injectable} from 'inversify';
import AccountSanitizer from "./sanitizer/AccountSanitizer";
import {AccountCreationRequest} from "./requests/AccountCreationRequest";
import {Account} from 'src/domain/account/Account';
import TYPE from '../../context/types';
import {AccountRequestValidator} from "./requests/validator/AccountRequestValidator";
import {AccountAlreadyExistsError} from "./exceptions/AccountAlreadyExistsError";
import {AccountRepository} from "../../domain/account/persistence/AccountRepository";
import {AccountFactory} from "./AccountFactory";

@injectable()
export default class AccountService {

  private accountSanitizer: AccountSanitizer;
  private accountRepository: AccountRepository;
  private accountFactory: AccountFactory;
  private accountRequestValidator: AccountRequestValidator;

  constructor(@inject(TYPE.AccountSanitizer) accountSanitizer: AccountSanitizer,
              @inject(TYPE.AccountRepository) accountRepository: AccountRepository,
              @inject(TYPE.AccountFactory) accountFactory: AccountFactory,
              @inject(TYPE.AccountRequestValidator) accountRequestValidator: AccountRequestValidator) {
    this.accountSanitizer = accountSanitizer;
    this.accountRepository = accountRepository;
    this.accountFactory = accountFactory;
    this.accountRequestValidator = accountRequestValidator;
  }

  public async createAccount(creationRequest: AccountCreationRequest): Promise<Account> {
    this.accountRequestValidator.validateAccountCreationRequest(creationRequest);
    await this.assertEmailDoesNotAlreadyExist(creationRequest.email);
    const newAccount: Account = this.accountFactory.create(creationRequest);
    return this.accountSanitizer.sanitize(await this.accountRepository.createAccount(newAccount));
  }

  private async assertEmailDoesNotAlreadyExist(email: string): Promise<void> {
    const existingAccount: Account = await this.accountRepository.findByEmail(email);
    if (!!existingAccount) throw new AccountAlreadyExistsError(email);
  }
}
