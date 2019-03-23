import "reflect-metadata";
import {ArticleService} from "../../../application/article/ArticleService";
import {ArticleRepository} from "../../../domain/article/ArticleRepository";
import {ArticleAssembler} from "../../../application/article/assembler/ArticleAssembler";
import createMockInstance from "jest-create-mock-instance";
import {Article} from "../../../domain/article/Article";
import {ShortArticleResponse} from "../../../application/article/response/ShortArticleResponse";
import {LongArticleResponse} from "../../../application/article/response/LongArticleResponse";

let articleService: ArticleService;
let articleRepository: ArticleRepository;
let articleAssembler: ArticleAssembler;

beforeEach(() => {
  articleRepository = {
    getAllArticles: async () => null,
    getById: async (articleId: string) => null,
    getAllForUser: async (userId: string) => null
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

describe('When getting an article by id', () => {
  const ARTICLE_ID: string = "nvih98eh43";
  let article: Article;
  let articleLongResponse: LongArticleResponse;

  beforeEach(() => {
    // @ts-ignore
    article = createMockInstance(Article);
    articleRepository.getById = async (id) => {
      if (id == ARTICLE_ID) return article
    };
    // @ts-ignore
    articleAssembler.toLongArticleResponse.mockImplementation((a) => {
        if (article == a)
          return articleLongResponse;
      }
    );
  });

  it('should return the right article', async (done) => {
    expect(await articleService.getArticleById(ARTICLE_ID)).toBe(articleLongResponse);
    done()
  });

  describe('when the article does not exists', () => {
    beforeEach(() => {
      articleRepository.getById = async () => null;
    });

    /*it('should raise an exception', async () => {
      return expect(articleService.getArticleById(ARTICLE_ID)).rejects.toThrow(Error)
    })*/
  });
});

describe('When getting articles from a user id', () => {
  const USER_ID: string = "nvih98eh43";
  let article: Article;
  let articleLongResponse: LongArticleResponse;

  beforeEach(() => {
    // @ts-ignore
    article = createMockInstance(Article);
    // @ts-ignore
    articleRepository.getAllForUser = async (id) => {
      if (id == USER_ID) return [article]
    };
    // @ts-ignore
    articleAssembler.toLongArticleResponse.mockImplementation((a) => {
        if (article == a)
          return articleLongResponse;
      }
    );
  });

  it('should return the right articles', async (done) => {
    expect(await articleService.getAllArticlesForUser(USER_ID)).toEqual([articleLongResponse]);
    done()
  });
});


