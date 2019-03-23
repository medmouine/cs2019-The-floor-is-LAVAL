import {MongoClient} from "mongodb";
import {inject, injectable} from "inversify";
import TYPES from "../../context/types";

@injectable()
class MongoArticlesRepository {
  private readonly mongoClient: MongoClient;
  
  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoClient) {
    this.mongoClient = mongoClient;
  }
}
