import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import {ArticleController} from "../../../../interfaces/http/articles/ArticleController";
import {ArticleService} from "../../../../application/article/ArticleService";
import {ShortArticleResponse} from "../../../../application/article/response/ShortArticleResponse";
import {LongArticleResponse} from "../../../../application/article/response/LongArticleResponse";
import * as express from 'express'
import {ArticleNotFoundException} from "../../../../application/article/exceptions/ArticleNotFoundException";
import {HttpStatus} from "../../../../interfaces/http/HttpStatus";

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

describe('when getting an article by id', () => {
  const ARTICLE_ID: string = "98sdfu98sdfh98";
  let articleResponse: LongArticleResponse;
  let response: express.Response;

  beforeEach(() => {
    // @ts-ignore
    response = {
      json: jest.fn(),
      status: jest.fn()
    };
    // @ts-ignore
    articleResponse = {};
    // @ts-ignore
    articleService.getArticleById.mockImplementation((id) => {
      if (id === ARTICLE_ID) return articleResponse
    });
  });

  it('should return the right article', async (done) => {
    await articleController.getArticleById(ARTICLE_ID, response);
    expect(response.json).toHaveBeenCalledWith(articleResponse);
    done();
  })

  describe('given an account that does not exist', () => {
    it('should return that the account is not found', async (done) => {
      // @ts-ignore
      articleService.getArticleById.mockImplementation((id) => {
        if (id === ARTICLE_ID) throw new ArticleNotFoundException(id);
      });
      await articleController.getArticleById(ARTICLE_ID, response);
      expect(response.status).toHaveBeenLastCalledWith(HttpStatus.NOT_FOUND);
      done();
    })
  })
});
