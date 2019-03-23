import {Article} from "../../../domain/article/Article";
import {ShortArticleResponse} from "../response/ShortArticleResponse";
import {injectable} from "inversify";

@injectable()
export class ArticleAssembler {
  public toShortArticleResponse(article: Article): ShortArticleResponse {
    return {
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      leadParagraph: article.leadParagraph,
      imageUrl: article.imageUrl,
      body: article.body,
      date: article.date,
      category: article.category
    }
  }
}
