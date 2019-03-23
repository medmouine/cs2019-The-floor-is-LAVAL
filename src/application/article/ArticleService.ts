import {ArticleRepository} from "../../domain/article/ArticleRepository";
import {inject, injectable} from "inversify";
import TYPES from "../../context/types";
import {ArticleAssembler} from "./assembler/ArticleAssembler";
import {ShortArticleResponse} from "./response/ShortArticleResponse";
import moment = require("moment");

@injectable()
export class ArticleService {
  private articleRepository: ArticleRepository;
  private articleAssembler: ArticleAssembler;

  constructor(
    @inject(TYPES.ArticleRepository)articleRepository: ArticleRepository,
    @inject(TYPES.ArticleAssembler) articleAssembler: ArticleAssembler) {
    this.articleRepository = articleRepository;
    this.articleAssembler = articleAssembler;
  }

  public async getArticles(): Promise<ShortArticleResponse[]> {
    const articles = await this.articleRepository.getAllArticles();
    return articles
      .map((article) => this.articleAssembler.toShortArticleResponse(article))
      .sort((a: ShortArticleResponse, b: ShortArticleResponse) => {
        // @ts-ignore
        return moment(b.date) - moment(a.date);
      });
  }
}
