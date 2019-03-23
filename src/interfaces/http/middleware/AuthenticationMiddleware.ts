import {BaseMiddleware, next, request, requestBody, response} from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from "../../../context/types";
import AccountService from "../../../application/account/AccountService";
import {HttpStatus} from "../HttpStatus";
import {TokenExpiredError} from "jsonwebtoken";

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {

  private readonly accountService: AccountService;

  constructor(@inject(TYPES.AccountService) accountService: AccountService) {
    super();
    this.accountService = accountService;
  }

  public async handler(@request() req: Request, @response() res: Response, @next() next: NextFunction): Promise<void> {
    const token: string = req.headers.authorization.replace('Bearer ', '');
    if (!token || token === '') {
      res.status(HttpStatus.FORBIDDEN).json('No token provided');
      return;
    }

    try {
      if (!await this.accountService.isAuthenticated(token)) {
        res.status(HttpStatus.FORBIDDEN).send();
        return;
      }
    } catch (e) {
      if (e instanceof TokenExpiredError) res.status(HttpStatus.FORBIDDEN).json(e.message);
      res.status(HttpStatus.SERVICE_UNAVAILABLE).json(e.message);
      return;
    }
    next();
  }
}
