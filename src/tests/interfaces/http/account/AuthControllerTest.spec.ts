//tslint:disable
import 'reflect-metadata';
import jestCreateMockInstance from 'jest-create-mock-instance';
import Mocked = jest.Mocked;
import AccountService from '../../../../application/account/AccountService';
import {AuthController} from '../../../../interfaces/http/account/AuthController';
import {AccountCreationRequest} from '../../../../application/account/requests/AccountCreationRequest';
import {Account} from '../../../../domain/account/Account';
import { Response } from 'jest-express/lib/response';
import * as express from 'express'
import {HttpStatus} from "../../../../interfaces/http/HttpStatus";
import {AccountAlreadyExistsError} from "../../../../application/account/exceptions/AccountAlreadyExistsError";

let accountService: Mocked<AccountService> = null;
let res: Response = new Response();
let authController: AuthController = null;

const VALID_EMAIL: string = 'email@email.com';
const ACCOUNT_ID: string = 'MyAccountId';
const PASSWORD: string = 'MySuperStrongPassword';
const FULL_NAME: string = 'John Doe';
const PASSWORD_SALT: string = 'Salty';

const accountCreationRequest: AccountCreationRequest = {
  email: VALID_EMAIL,
  password: PASSWORD,
  fullName: FULL_NAME
};
const account: Account = {
  userId: ACCOUNT_ID,
  email: VALID_EMAIL,
  fullName: FULL_NAME,
  passwordHash: PASSWORD,
  passwordSalt: PASSWORD_SALT
};

beforeEach(() => {
  accountService = jestCreateMockInstance(AccountService);
  authController = new AuthController(accountService);
});

describe('When creating an account from valid parameters', () => {

  beforeEach(() => {
    res.resetMocked();
    // @ts-ignore
    accountService.createAccount.mockReturnValueOnce(account);
  });

  it('should create the account successfully', async (done) => {
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(accountService.createAccount).toHaveBeenCalledWith(accountCreationRequest);
    done();
  });

  it('should have CREATED Http status', async (done) => {
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(res.status).toHaveBeenLastCalledWith(HttpStatus.CREATED);
    done();
  });


  it('should return account', async (done) => {
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(res.json).toHaveBeenLastCalledWith(account);
    done();
  });
});

describe('When error thrown during account creation', () => {
  const accountAlreadyExistingError: AccountAlreadyExistsError = new AccountAlreadyExistsError(accountCreationRequest.email);
  const customError: Error = new Error('Error message');

  beforeEach(() => {
    res.resetMocked();
    // @ts-ignore
  });

  it('should have CONFLICT Http status if account already exists', async (done) => {
    accountService.createAccount.mockImplementationOnce((accountCreationRequest) => {
      throw new AccountAlreadyExistsError(accountCreationRequest.email);
    });
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(res.status).toHaveBeenLastCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    done();
  });

  it('should have BAD_REQUEST Http status account if unknown error', async (done) => {
    accountService.createAccount.mockImplementationOnce((accountCreationRequest) => {
      throw customError;
    });
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(res.status).toHaveBeenLastCalledWith(HttpStatus.BAD_REQUEST);
    done();
  });

  it('should contain error message in response body', async (done) => {
    accountService.createAccount.mockImplementationOnce((accountCreationRequest) => {
      throw customError;
    });
    // @ts-ignore
    await authController.createAccount(accountCreationRequest, res);
    expect(res.json).toHaveBeenLastCalledWith({ message: customError.message } );
    done();
  });
});
