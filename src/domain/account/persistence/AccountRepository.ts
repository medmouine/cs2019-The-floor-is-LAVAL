import {Account} from "../Account";

export interface AccountRepository {
  findById(accountId: string): Promise<Account>;
  createAccount(account: Account): Promise<void>;
  findByEmail(email: string): Promise<Account>;
}
