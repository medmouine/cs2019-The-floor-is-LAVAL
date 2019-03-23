import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import {AuthenticationMiddleware} from "../../../interfaces/http/middleware/AuthenticationMiddleware";
import AccountService from "../../../application/account/AccountService";
import { Response } from 'jest-express/lib/response';
import { Request } from 'jest-express/lib/request';
import { NextFunction } from 'jest-express/lib/next';

import Mocked = jest.Mocked;
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

let res: Response = new Response();
let req: Request = new Request();
let next: NextFunction = jest.fn();

let authenticationMiddleware: AuthenticationMiddleware;
let accountService: Mocked<AccountService>;

const TOKEN: string = 'mySuperSecretToken';

describe('When checking authentication', () => {

  beforeEach(() => {
    req.headers.authorization = TOKEN;
    accountService = createMockInstance(AccountService);
    authenticationMiddleware = new AuthenticationMiddleware(accountService);
  });

  it('should return FORBIDDEN if token is empty', async (done) => {
    req.headers.authorization = '';
    // @ts-ignore
    await authenticationMiddleware.handler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    done()
  });

  it('should return FORBIDDEN if token is invalid', async (done) => {
    // @ts-ignore
    accountService.isAuthenticated.mockReturnValueOnce(false);
    // @ts-ignore
    await authenticationMiddleware.handler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    done()
  });

  it('should call next if token is valid', async (done) => {
    // @ts-ignore
    accountService.isAuthenticated.mockReturnValueOnce(true);
    // @ts-ignore
    await authenticationMiddleware.handler(req, res, next);
    expect(next).toHaveBeenCalled();
    done()
  });
});

