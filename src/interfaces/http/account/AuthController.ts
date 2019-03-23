import 'reflect-metadata';
import {controller, httpPost, requestBody, response} from 'inversify-express-utils';
import {HttpStatus} from "../HttpStatus";
import {AccountCreationRequest} from "../../../application/account/requests/AccountCreationRequest";
import * as express from 'express'
import {handleServiceError} from "../ErrorHandler";
import {inject} from "inversify";
import TYPE from '../../../context/types'
import {Account} from "../../../domain/account/Account";
import AccountService from "../../../application/account/AccountService";
import {Credentials} from "../../../application/account/requests/Credentials";

export const BASE_AUTH_URL: string = '/auth';

@controller(BASE_AUTH_URL)
export class AuthController {

  private readonly accountService: AccountService;

  constructor(@inject(TYPE.AccountService) accountService: AccountService) {
    this.accountService = accountService;
  }

  @httpPost('/createAccount')
  public async createAccount(@requestBody() accountCreationRequest: AccountCreationRequest, @response() res: express.Response): Promise<Account> {
    res.status(HttpStatus.CREATED);
    return handleServiceError(async () => await this.accountService.createAccount(accountCreationRequest), res);
  }

  @httpPost('/authenticate')
  public async authenticate(@requestBody() credentials: Credentials, @response() res: express.Response): Promise<string> {
    res.status(HttpStatus.SUCCESS);
    return handleServiceError(async () => ({
      accessToken: await this.accountService.authenticate(credentials)
    }), res);
  }
}
