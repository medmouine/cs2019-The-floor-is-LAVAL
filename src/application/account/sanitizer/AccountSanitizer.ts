import { injectable } from 'inversify';
import {Account} from 'src/domain/account/Account';
import Sanitizer from "../../global/sanitizer/Sanitizer";

@injectable()
export default class AccountSanitizer implements Sanitizer<Account> {
  public sanitize(account: Account): Account {
    const accountToSanitize: Account = account;
    delete accountToSanitize.passwordSalt;
    delete accountToSanitize.passwordHash;
    return accountToSanitize;
  }
}
