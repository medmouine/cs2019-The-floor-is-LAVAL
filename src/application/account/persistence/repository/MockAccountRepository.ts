import {Account} from "src/domain/account/Account";
import {AccountRepository} from "../../../../domain/account/persistence/AccountRepository";
import {logger} from "../../../../logger";
import {injectable} from "inversify";

@injectable()
export class MockAccountRepository implements AccountRepository {

  private static accountStore: Account[] = [];

  public async createAccount(account: Account): Promise<Account> {
    MockAccountRepository.accountStore.push(account);
    logger.info(`Created account with email : ${account.email}`);
    return account;
  }

  public async findByEmail(email: string): Promise<Account> {
    const account: Account = MockAccountRepository.accountStore.find( (entity) => entity.email === email);
    logger.info(`Checking accounts with email : ${email}`);
    return account;
  }
}
