//tslint:disable
import 'reflect-metadata';
import AccountSanitizer from "../../../../application/account/sanitizer/AccountSanitizer";
import {Account} from "../../../../domain/account/Account";

let accountSanitizer: AccountSanitizer = null;

const VALID_EMAIL: string = 'email@email.com';
const ACCOUNT_ID: string = 'MyAccountId';
const PASSWORD: string = 'MySuperStrongPassword';
const FULL_NAME: string = 'John Doe';
const PASSWORD_SALT: string = 'Salty';

const account: Account = {
  userId: ACCOUNT_ID,
  email: VALID_EMAIL,
  fullName: FULL_NAME,
  passwordHash: PASSWORD,
  passwordSalt: PASSWORD_SALT
};

beforeEach(() => {
  accountSanitizer = new AccountSanitizer();
});

describe('When sanitize account', () => {
  it('account should be sanitized',  () => {
    const expected: Account = accountSanitizer.sanitize(account);
    expect(expected.passwordHash).toBeUndefined()
    expect(expected.passwordSalt).toBeUndefined()
  });
});
