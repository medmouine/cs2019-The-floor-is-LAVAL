import "reflect-metadata";
import {ArticleService} from "../../../application/article/ArticleService";
import {ArticleRepository} from "../../../domain/article/ArticleRepository";
import {ArticleAssembler} from "../../../application/article/assembler/ArticleAssembler";
import createMockInstance from "jest-create-mock-instance";
import {Article} from "../../../domain/article/Article";
import {ShortArticleResponse} from "../../../application/article/response/ShortArticleResponse";

let articleService: ArticleService;
let articleRepository: ArticleRepository;
let articleAssembler: ArticleAssembler;

beforeEach(() => {
  articleRepository = {
    getAllArticles: async () => null
  };
  articleAssembler = createMockInstance(ArticleAssembler);
  articleService = new ArticleService(articleRepository, articleAssembler);
});

describe('When getting all the articles', () => {
  let articleSmallDate: Article;
  let articleBigDate: Article;
  let articleShortResponseSmallDate: ShortArticleResponse;
  let articleShortResponseBigDate: ShortArticleResponse;

  beforeEach(() => {
    articleSmallDate = createMockInstance(Article);
    // @ts-ignore
    articleSmallDate.date = "2018-03-05 16:56:33";
    articleBigDate = createMockInstance(Article);
    // @ts-ignore
    articleBigDate.date = "2018-03-05 18:56:33";

    articleRepository.getAllArticles = async () => [articleSmallDate, articleBigDate];
    // @ts-ignore
    articleAssembler.toShortArticleResponse.mockImplementation((a) => {
        if (articleSmallDate == a)
          return articleShortResponseSmallDate;
        if (articleBigDate == a)
          return articleShortResponseBigDate;
      }
    );
    // @ts-ignore
    articleShortResponseSmallDate = {date: "2018-03-05 16:56:33"};
    // @ts-ignore
    articleShortResponseBigDate = {date: "2018-03-05 18:56:33"};
  });

  it('should return the right articles', async (done) => {
    const articles = await articleService.getArticles();
    expect(articles).toHaveLength(2);
    expect(articles).toContain(articleShortResponseSmallDate);
    expect(articles).toContain(articleShortResponseBigDate);
    done()
  });

  it('should return the articles sorted by decreasing date', async (done) => {
    expect(await articleService.getArticles()).toEqual([articleShortResponseBigDate, articleShortResponseSmallDate]);
    done();
  })
});
