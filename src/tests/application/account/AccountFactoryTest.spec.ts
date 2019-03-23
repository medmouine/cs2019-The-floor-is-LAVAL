//tslint:disable
import 'reflect-metadata';
import jestCreateMockInstance from 'jest-create-mock-instance';
import {AccountFactory} from "../../../application/account/AccountFactory";
import {AccountCreationRequest} from "../../../application/account/requests/AccountCreationRequest";
import {Account} from "../../../domain/account/Account";

jest.mock('uuid/v4');
import { v4 as uuid } from 'uuid';

let accountFactory: AccountFactory = null;

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
  accountFactory = new AccountFactory();
  // @ts-ignore
  uuid.mockReturnValueOnce(ACCOUNT_ID);
  // @ts-ignore
  uuid.mockReturnValueOnce(PASSWORD_SALT);

});

describe('When create account', () => {
  it('account should be valid',  () => {
    const expected: Account = accountFactory.create(accountCreationRequest);
    expect(expected).toEqual(account)
  });
});
