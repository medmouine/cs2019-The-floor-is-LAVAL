import {inject, injectable} from 'inversify';
import AccountSanitizer from "./sanitizer/AccountSanitizer";
import {AccountCreationRequest} from "./requests/AccountCreationRequest";
import {Account} from 'src/domain/account/Account';
import TYPE from '../../context/types';
import {AccountAlreadyExistsError} from "./exceptions/AccountAlreadyExistsError";
import {AccountRepository} from "../../domain/account/persistence/AccountRepository";
import {AccountFactory} from "./AccountFactory";
import {Credentials} from "./requests/Credentials";
import {AccountRequestValidator} from './requests/validator/AccountRequestValidator';
import {EmailDoesNotExistError} from "./exceptions/EmailDoesNotExistError";
import {CredentialsDoesNotMatchError} from "./exceptions/CredentialsDoesNotMatchError";
import {CryptoUtils} from "./utils/CryptoUtils";
import {TokenUtil} from "./utils/TokenUtil";

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

  public async authenticate(credentials: Credentials): Promise<string> {
    this.accountRequestValidator.validateCredentials(credentials);
    const { email, password } = credentials;
    const account: Account = await this.handleGetAccountByEmail(email);
    if (!(await CryptoUtils.compare(password, account.passwordHash))) throw new CredentialsDoesNotMatchError();
    return TokenUtil.createNewToken(account.userId);
  }

  private async assertEmailDoesNotAlreadyExist(email: string): Promise<void> {
    const existingAccount: Account = await this.accountRepository.findByEmail(email);
    if (!!existingAccount) throw new AccountAlreadyExistsError(email);
  }

  private async handleGetAccountByEmail(submittedEmail: string): Promise<Account> {
    const email = submittedEmail;
    const account: Account = await this.accountRepository.findByEmail(email);
    if (!account) throw new EmailDoesNotExistError(email);
    return account;
  }
}
