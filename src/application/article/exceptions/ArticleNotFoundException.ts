import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class ArticleNotFoundException extends ServiceException {
  constructor(articleId: string) {
    super(`Article with id '${articleId}' does not exist`, HttpStatus.NOT_FOUND);
  }
}
