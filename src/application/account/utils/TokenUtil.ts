import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export class TokenUtil {
  private static EXPIRES_IN = '1h';

  public static createNewToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: TokenUtil.EXPIRES_IN });
  }

  public static isValidToken (token: string): boolean {
    return !!jwt.verify(token, process.env.JWT_SECRET);
  }

  public static doesOwnToken (userId: string, token: string): boolean {
    const id: string | object = jwt.verify(token, process.env.JWT_SECRET);
    return id === userId;
  }
}
