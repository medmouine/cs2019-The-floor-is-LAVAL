import {controller, httpGet} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../../../context/types";
import {ArticleService} from "../../../application/article/ArticleService";
import {ShortArticleResponse} from "../../../application/article/response/ShortArticleResponse";

export const BASE_STATUS_URL: string = '/articles';

@controller(BASE_STATUS_URL)
export class ArticleController {
  private readonly articleService: ArticleService;

  constructor(@inject(TYPES.ArticleService) articleService: ArticleService) {
    this.articleService = articleService;
  }

  @httpGet('/')
  public async getArticles(): Promise<ShortArticleResponse[]> {
    return this.articleService.getArticles();
  }
}
