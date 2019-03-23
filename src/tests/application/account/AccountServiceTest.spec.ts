//tslint:disable
import 'reflect-metadata';
import jestCreateMockInstance from 'jest-create-mock-instance';
import Mocked = jest.Mocked;
import AccountService from "../../../application/account/AccountService";
import AccountSanitizer from "../../../application/account/sanitizer/AccountSanitizer";
import {AccountFactory} from "../../../application/account/AccountFactory";
import {AccountRepository} from "../../../domain/account/persistence/AccountRepository";
import {AccountCreationRequest} from "../../../application/account/requests/AccountCreationRequest";
import {Account} from "../../../domain/account/Account";
import {AccountRequestValidator} from "../../../application/account/requests/validator/AccountRequestValidator";
import {Credentials} from "../../../application/account/requests/Credentials";

let accountService: AccountService = null;
let accountSanitizer: Mocked<AccountSanitizer> = null;
let accountFactory: Mocked<AccountFactory> = null;
let accountRepository: Mocked<AccountRepository> = null;
let accountRequestValidator: Mocked<AccountRequestValidator> = null;

const VALID_EMAIL: string = 'email@email.com';
const ACCOUNT_ID: string = 'MyAccountId';
const PASSWORD: string = 'MySuperStrongPassword';
const FULL_NAME: string = 'John Doe';
const PASSWORD_SALT: string = 'Salty';
const CUSTOM_ERROR = new Error('My Error message');
const TOKEN: string = 'MySuperStrongToken';

jest.mock("../../../application/account/utils/CryptoUtils");
jest.mock("../../../application/account/utils/TokenUtil");
import { CryptoUtils } from "../../../application/account/utils/CryptoUtils";
import { TokenUtil } from "../../../application/account/utils/TokenUtil";

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

const sanitizedAccount: Partial<Account> = {
  userId: ACCOUNT_ID,
  email: VALID_EMAIL,
  fullName: FULL_NAME,
};

beforeEach(() => {
  accountSanitizer = jestCreateMockInstance(AccountSanitizer);
  accountFactory = jestCreateMockInstance(AccountFactory);
  accountRequestValidator = jestCreateMockInstance(AccountRequestValidator);
});

describe('When creating an account from valid parameters', () => {

  beforeEach(() => {
    // @ts-ignore
    accountSanitizer.sanitize.mockReturnValueOnce(sanitizedAccount);
    // @ts-ignore
    accountFactory.create.mockReturnValueOnce(account);
    accountRepository = {
      // @ts-ignore
      createAccount: jest.fn(async (newAccount: Account) => newAccount),
      // @ts-ignore
      findByEmail: jest.fn(async (email: string) => undefined),
      // @ts-ignore
      findById: jest.fn(async (id: string) => account)
    };
    accountService = new AccountService(accountSanitizer, accountRepository, accountFactory, accountRequestValidator);
  });

  it('should create the account successfully', async (done) => {
    // @ts-ignore
    await accountService.createAccount(accountCreationRequest);
    expect(accountRepository.createAccount).toHaveBeenCalledWith(account);
    done();
  });

  it('should return sanitized account', async (done) => {
    // @ts-ignore
    const expected: Partial<Account> = await accountService.createAccount(accountCreationRequest);
    expect(expected).toBe(sanitizedAccount);
    done();
  });
});

describe('When creating an account from invalid parameters', () => {

  beforeEach(() => {
    // @ts-ignore
    accountSanitizer.sanitize.mockReturnValueOnce(sanitizedAccount);
    // @ts-ignore
    accountFactory.create.mockReturnValueOnce(account);
    accountRepository = {
      // @ts-ignore
      createAccount: jest.fn(async (newAccount: Account) => newAccount),
      // @ts-ignore
      findByEmail: jest.fn(async (email: string) => undefined),
      // @ts-ignore
      findById: jest.fn(async (id: string) => account)
    };
    accountService = new AccountService(accountSanitizer, accountRepository, accountFactory, accountRequestValidator);
  });

  it('should throw validator error', async (done) => {
    accountRequestValidator.validateAccountCreationRequest.mockImplementation( (accountCreationRequest: AccountCreationRequest) => {
      throw CUSTOM_ERROR;
    });

    try {
      await accountService.createAccount(accountCreationRequest);
    } catch (e) {
      expect(e.message).toBe(CUSTOM_ERROR.message)
    }
    done();
  });

  it('should throw AccountAlreadyExistingError if email already exists', async (done) => {
    // @ts-ignore
    accountRepository.findByEmail = jest.fn(async (email: string) => account);
    try {
      await accountService.createAccount(accountCreationRequest);
    } catch (e) {
      expect(e.message).toBe(`Account with email : ${accountCreationRequest.email} already exists`)
    }
    done();
  });
});

describe('When authenticating with invalid credentials', () => {
  beforeEach(() => {
    // @ts-ignore
    accountSanitizer.sanitize.mockReturnValueOnce(sanitizedAccount);
    // @ts-ignore
    accountFactory.create.mockReturnValueOnce(account);
    accountRepository = {
      // @ts-ignore
      createAccount: jest.fn(async (newAccount: Account) => newAccount),
      // @ts-ignore
      findByEmail: jest.fn(async (email: string) => undefined),
      // @ts-ignore
      findById: jest.fn(async (id: string) => account)
    };
    accountService = new AccountService(accountSanitizer, accountRepository, accountFactory, accountRequestValidator);
  });

  it('should throw validator error', async (done) => {
    accountRequestValidator.validateCredentials.mockImplementation((credentials: Credentials) => {
      throw CUSTOM_ERROR;
    });

    try {
      await accountService.authenticate(accountCreationRequest);
    } catch (e) {
      expect(e.message).toBe(CUSTOM_ERROR.message)
    }
    done();
  });

  it('should throw Account does not exist error if email not registered', async (done) => {
    // @ts-ignore
    accountRepository.findByEmail = jest.fn(async (email: string) => undefined);
    try {
      await accountService.authenticate(accountCreationRequest);
    } catch (e) {
      expect(e.message).toBe(`Account with email : ${accountCreationRequest.email} does not exist`)
    }
    done();
  });
});


describe('When authenticating with valid credentials', () => {
  beforeEach(() => {
    // @ts-ignore
    accountSanitizer.sanitize.mockReturnValueOnce(sanitizedAccount);
    // @ts-ignore
    accountFactory.create.mockReturnValueOnce(account);
    accountRepository = {
      // @ts-ignore
      createAccount: jest.fn(async (newAccount: Account) => newAccount),
      // @ts-ignore
      findByEmail: jest.fn(async (email: string) => undefined),
      // @ts-ignore
      findById: jest.fn(async (id: string) => account)
    };
    accountService = new AccountService(accountSanitizer, accountRepository, accountFactory, accountRequestValidator);
  });

  it('should throw invalid credentials error if credentials do not match', async (done) => {
    // @ts-ignore
    CryptoUtils.compare.mockReturnValueOnce(false);
    // @ts-ignore
    accountRepository.findByEmail = jest.fn(async (email: string) => account);
    try {
      await accountService.authenticate(accountCreationRequest);
    } catch (e) {
      expect(e.message).toBe('Email or password invalid')
    }
    done();
  });

  it('should return new token if credentials are valid', async (done) => {
    // @ts-ignore
    CryptoUtils.compare.mockReturnValueOnce(true);
    // @ts-ignore
    TokenUtil.createNewToken.mockReturnValueOnce(TOKEN);

    // @ts-ignore
    accountRepository.findByEmail = jest.fn(async (email: string) => account);
    const expected: string = await accountService.authenticate(accountCreationRequest);
    expect(expected).toBe(TOKEN);
    done();
  });
});
