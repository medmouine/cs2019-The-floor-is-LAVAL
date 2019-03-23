import {Db} from 'mongodb';
import {injectable} from 'inversify';
import {MongoDBConnection} from './MongoDBConnection';

@injectable()
export class MongoDBClient {
  public db?: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }
}
