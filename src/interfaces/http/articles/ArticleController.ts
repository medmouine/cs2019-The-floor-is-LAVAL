import {controller, httpGet, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import TYPES from "../../../context/types";
import {ArticleService} from "../../../application/article/ArticleService";
import {ShortArticleResponse} from "../../../application/article/response/ShortArticleResponse";
import {LongArticleResponse} from "../../../application/article/response/LongArticleResponse";
import {handleServiceError} from "../ErrorHandler";
import * as express from "express";

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

  @httpGet('/:articleId')
  public async getArticleById(@requestParam('articleId') articleId: string, @response() res: express.Response): Promise<LongArticleResponse> {
    return handleServiceError(() => this.articleService.getArticleById(articleId), res);
  }

  @httpGet('/user/:userId')
  public async getAllArticlesForUser(@requestParam('userId') userId: string) {
    return this.articleService.getAllArticlesForUser(userId);
  }
}
