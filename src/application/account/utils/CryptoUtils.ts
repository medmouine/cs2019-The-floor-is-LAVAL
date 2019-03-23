import { compare, hash, genSalt } from 'bcrypt';
import {logger} from "../../../logger";

export class CryptoUtils {
  public static async hash(str: string, salt: string): Promise<string> {
    return hash(str, salt);
  }

  public static async compare(hashedValue: string, concurrent: string): Promise<boolean> {
    logger.info(hashedValue);
    return compare(concurrent, hashedValue);
  }

  public static async generateSalt() {
    return genSalt();
  }
}
