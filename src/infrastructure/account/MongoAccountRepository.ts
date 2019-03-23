import {MongoClient} from 'mongodb';
import {inject, injectable} from 'inversify';
import TYPES from '../../context/types';
import {Account} from '../../domain/account/Account';
import {AccountRepository} from "../../domain/account/persistence/AccountRepository";

@injectable()
class MongoAccountRepository implements AccountRepository {
  private static ACCOUNT_COLLECTION = 'account';

  private readonly mongoClient: MongoClient;

  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoClient) {
    this.mongoClient = mongoClient;
  }

  createAccount(account: Account): Promise<Account> {
    return undefined;
  }

  public async findByEmail(email: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      return this.mongoClient.db.collection(MongoAccountRepository.ACCOUNT_COLLECTION).findOne({ email }, (error, find) => {
        if (error) {
          reject(error);
        }
        resolve(find);
      });
    });
  }
}
