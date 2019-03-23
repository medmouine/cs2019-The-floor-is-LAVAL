import {injectable} from "inversify";
import {AccountCreationRequest} from "./requests/AccountCreationRequest";
import {Account} from "../../domain/account/Account";
import { v4 as uuid } from 'uuid';
import {CryptoUtils} from "./utils/CryptoUtils";

@injectable()
export class AccountFactory {
  public async create(accountCreationRequest: AccountCreationRequest): Promise<Account> {
    const account: Account = new Account();
    account.userId = uuid();
    account.email = accountCreationRequest.email;
    account.fullName = accountCreationRequest.fullName;
    account.passwordSalt = await CryptoUtils.generateSalt();
    account.passwordHash = await CryptoUtils.hash(accountCreationRequest.password, account.passwordSalt);

    return account;
  }
}
