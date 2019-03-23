import {inject, injectable} from "inversify";
import TYPES from "../../context/types";
import {ArticleRepository} from "../../domain/article/ArticleRepository";
import {Article} from "../../domain/article/Article";
import {MongoDBClient} from "../mongo/MongoClient";

const ARTICLES_COLLECTION = "articles";

@injectable()
export class MongoArticleRepository implements ArticleRepository {
  private readonly mongoClient: MongoDBClient;

  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this.mongoClient = mongoClient;
  }

  public getAllArticles(): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      return this.mongoClient.db.collection(ARTICLES_COLLECTION).find().toArray((error, find) => {
        if (error) {
          reject(error);
        }
        resolve(find);
      });
    });
  }
}
