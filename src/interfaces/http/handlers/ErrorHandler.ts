import * as express from 'express';
import {AccountAlreadyExistsError} from "../../../application/account/exceptions/AccountAlreadyExistsError";
import {HttpStatus} from "../HttpStatus";
import {logger} from "../../../logger";
import {EmailDoesNotExistError} from "../../../application/account/exceptions/EmailDoesNotExistError";
import {CredentialsDoesNotMatchError} from "../../../application/account/exceptions/CredentialsDoesNotMatchError";

export async function handleAlreadyExistingAccount(callback: () => Promise<any>, res: express.Response): Promise<any> {
  try {
    res.json(await callback());
  } catch (e) {
    if (!!e.type && e.type === AccountAlreadyExistsError) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      res.status(HttpStatus.BAD_REQUEST);
    }

    logger.error(e.message);
    res.json({ message: e.message });
  }
}

export async function handleNoneExistingEntity(callback: () => Promise<any>, res: express.Response): Promise<any> {
  try {
    res.json(await callback());
  } catch (e) {
    if (e instanceof EmailDoesNotExistError ) {
      res.status(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.BAD_REQUEST);
    }
    logger.error(e.message);
    res.json({ message: e.message });
  }
}

export async function handleNoneMatchingCredentials(callback: () => Promise<any>, res: express.Response): Promise<any> {
  try {
    res.json({ acccessToken: await callback() });
  } catch (e) {
    if (e instanceof CredentialsDoesNotMatchError) {
      res.status(HttpStatus.FORBIDDEN);
    } else {
      res.status(HttpStatus.BAD_REQUEST);
    }
    logger.error(e.message);
    res.json({ message: e.message });
  }
}
