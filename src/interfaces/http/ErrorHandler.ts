import * as express from 'express';
import {HttpStatus} from "./HttpStatus";
import {logger} from "../../logger";

export async function handleServiceError(callback: () => Promise<any>, res: express.Response): Promise<any> {
  try {
    res.json(await callback());
  } catch (e) {
    if (!!e.status) {
      res.status(e.status);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    logger.error(e);
    res.json({message: e.message});
  }
}
