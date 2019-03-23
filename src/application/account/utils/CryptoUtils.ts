import { compare, hash } from 'bcrypt';

export class CryptoUtils {
  public static async hash(str: string, salt: string): Promise<string> {
    return hash(str, salt);
  }

  public static async compare(hashedValue: string, concurrent: string): Promise<boolean> {
    return compare(concurrent, hashedValue);
  }
}
