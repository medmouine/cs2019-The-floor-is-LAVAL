import {Account} from "../Account";

export interface AccountRepository {
  createAccount(account: Account): Promise<Account>;
  findByEmail(email: string): Promise<Account>;
}
