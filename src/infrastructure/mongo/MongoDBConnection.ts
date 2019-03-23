import {Db, MongoClient} from 'mongodb';
import {logger} from "../../logger";

const MONGO_DB_ENV_KEY: string = "MONGODB_URI";

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error, db: Db) => void) {
    const connectionString: string = process.env[MONGO_DB_ENV_KEY];
    const dbName = connectionString.substr(connectionString.lastIndexOf("/") + 1);
    logger.info("Trying to connect to : " + connectionString);
    logger.info("Db name taken from connection string : " + dbName);
    MongoClient.connect(connectionString, (err, client) => {
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}
