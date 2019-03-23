import 'reflect-metadata';
import { controller } from 'inversify-express-utils';

export const BASE_ACCOUNT_ROUTE: string = '/accounts';

@controller(BASE_ACCOUNT_ROUTE)
export class AccountController {
}
