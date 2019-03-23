import 'reflect-metadata';
import {controller, httpPost, requestBody, response} from 'inversify-express-utils';
import {HttpStatus} from "../HttpStatus";
import {AccountCreationRequest} from "../../../application/account/requests/AccountCreationRequest";
import * as express from 'express'
import {handleAlreadyExistingAccount} from "../handlers/ErrorHandler";
import {inject} from "inversify";
import TYPE from '../../../context/types'
import {Account} from "../../../domain/account/Account";
import AccountService from "../../../application/account/AccountService";

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
    return handleAlreadyExistingAccount(async () => await this.accountService.createAccount(accountCreationRequest), res);
  }
}
