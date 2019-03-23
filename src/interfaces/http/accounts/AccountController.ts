import 'reflect-metadata';
import { controller } from 'inversify-express-utils';

export const BASE_ROUTE_URL: string = '/accounts';

@controller(BASE_ROUTE_URL)
export class AccountController {
}
