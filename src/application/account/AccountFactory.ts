import {injectable} from "inversify";
import {AccountCreationRequest} from "./requests/AccountCreationRequest";
import {Account} from "../../domain/account/Account";
import { v4 as uuid } from 'uuid';

@injectable()
export class AccountFactory {
  public create(accountCreationRequest: AccountCreationRequest): Account {
    const account: Account = new Account();
    account.userId = uuid();
    account.email = accountCreationRequest.email;
    account.fullName = accountCreationRequest.fullName;
    account.passwordHash = accountCreationRequest.password;
    account.passwordSalt = uuid();

    return account;
  }
}
