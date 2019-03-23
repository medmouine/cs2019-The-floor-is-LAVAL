import {inject, injectable} from "inversify";
import TYPES from "../../context/types";
import {MongoDBClient} from "../mongo/MongoClient";
import {AccountRepository} from "../../domain/account/persistence/AccountRepository";
import {Account} from "../../domain/account/Account";


@injectable()
export class MongoAccountRepository implements AccountRepository {
  private static ACCOUNT_COLLECTION = 'account';
  private readonly mongoClient: MongoDBClient;

  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this.mongoClient = mongoClient;
  }

  createAccount(account: Account): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.mongoClient.db.collection(MongoAccountRepository.ACCOUNT_COLLECTION).insertOne(account, (error) => {
        if (error) {
          reject(error);
        }
        resolve()
      });
    });
  }

  findByEmail(email: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      return this.mongoClient.db.collection(MongoAccountRepository.ACCOUNT_COLLECTION).findOne({ email }, (error, find) => {
        if (error) {
          reject(error);
        }
        if (!!find) delete find._id;
        resolve(find);
      });
    });
  }

  findById(userId: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      return this.mongoClient.db.collection(MongoAccountRepository.ACCOUNT_COLLECTION).findOne({ userId }, (error, find) => {
        if (error) {
          reject(error);
        }
        delete find._id;
        resolve(find);
      });
    });
  }
}
