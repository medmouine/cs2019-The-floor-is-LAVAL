import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export class TokenUtil {
  private static EXPIRES_IN = '1h';
  private static JWT_SECRET = '44a0a45f31cf8122651e28710a43530e'
  public static createNewToken(userId: string): string {
    return jwt.sign({ id: userId }, TokenUtil.JWT_SECRET, { expiresIn: TokenUtil.EXPIRES_IN });
  }

  public static isValidToken (token: string): boolean {
    return !!jwt.verify(token, TokenUtil.JWT_SECRET);
  }

  public static doesOwnToken (userId: string, token: string): boolean {
    const id: string | object = jwt.verify(token, TokenUtil.JWT_SECRET);
    return id === userId;
  }
}
