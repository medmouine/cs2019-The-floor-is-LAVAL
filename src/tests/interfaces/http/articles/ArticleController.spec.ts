import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import {ArticleController} from "../../../../interfaces/http/articles/ArticleController";
import {ArticleService} from "../../../../application/article/ArticleService";
import {ShortArticleResponse} from "../../../../application/article/response/ShortArticleResponse";

let articleController: ArticleController;
let articleService: ArticleService;

beforeEach(() => {
  articleService = createMockInstance(ArticleService);
  articleController = new ArticleController(articleService);
});

describe('When getting the articles', () => {
  let articleResponse: ShortArticleResponse;
  beforeEach(() => {
    // @ts-ignore
    articleResponse = {};
    // @ts-ignore
    articleService.getArticles.mockReturnValue([articleResponse]);
  });

  it('should return the right status', async (done) => {
    expect(await articleController.getArticles()).toEqual([articleResponse]);
    done()
  });
});

