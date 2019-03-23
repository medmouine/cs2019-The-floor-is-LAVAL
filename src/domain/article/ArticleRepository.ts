import {Article} from "./Article";

export interface ArticleRepository {
  getAllArticles(): Promise<Article[]>;

  getById(articleId: string): Promise<Article>;

  getAllForUser(userId: string): Promise<Article[]>;
}
