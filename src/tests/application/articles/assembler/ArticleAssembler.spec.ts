import 'reflect-metadata'
import {Article} from "../../../../domain/article/Article";
import {ArticleAssembler} from "../../../../application/article/assembler/ArticleAssembler";

let articleAssembler: ArticleAssembler;

beforeEach(() => {
  articleAssembler = new ArticleAssembler();
});

describe('when converting an article to a short response', () => {
  // @ts-ignore
  const article: Article = {
    _id: "id2345",
    _title: "title",
    _subtitle: "sub",
    _leadParagraph: "lead",
    _imageUrl: "url",
    _body: "body",
    _author: "author",
    _userId: "userid",
    _date: new Date("2013-04-04"),
    _category: "category",
  };

  it('should convert to short response with all attributes', () => {
    const shortResponse = articleAssembler.toShortArticleResponse(article);
    expect(shortResponse.id).toBe(article.id);
    expect(shortResponse.title).toBe(article.title);
    expect(shortResponse.subtitle).toBe(article.subtitle);
    expect(shortResponse.leadParagraph).toBe(article.leadParagraph);
    expect(shortResponse.imageUrl).toBe(article.imageUrl);
    expect(shortResponse.body).toBe(article.body);
    expect(shortResponse.category).toBe(article.category);
    expect(shortResponse.date).toBe(article.date);
  })
});

describe('when converting an article to a long response', () => {
  // @ts-ignore
  const article: Article = {
    _id: "id2345",
    _title: "title",
    _subtitle: "sub",
    _leadParagraph: "lead",
    _imageUrl: "url",
    _body: "body",
    _author: "author",
    _userId: "userid",
    _date: new Date("2013-04-04"),
    _category: "category",
  };

  it('should convert to short response with all attributes', () => {
    const longResponse = articleAssembler.toLongArticleResponse(article);
    expect(longResponse.id).toBe(article.id);
    expect(longResponse.title).toBe(article.title);
    expect(longResponse.subtitle).toBe(article.subtitle);
    expect(longResponse.leadParagraph).toBe(article.leadParagraph);
    expect(longResponse.imageUrl).toBe(article.imageUrl);
    expect(longResponse.body).toBe(article.body);
    expect(longResponse.category).toBe(article.category);
    expect(longResponse.date).toBe(article.date);
    expect(longResponse.userId).toBe(article.userId);
    expect(longResponse.category).toBe(article.category);
  })
});
