import {Db} from 'mongodb';
import {injectable} from 'inversify';
import {MongoDBConnection} from './MongoDBConnection';

@injectable()
export class MongoDBClient {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, result: (error, data) => void): void {
    this.db.collection(collection).find().toArray((error, find) => {
      return result(error, find);
    });
  }
}
