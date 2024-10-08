export interface IAuthRepository {
  verifyToken(token: string): Promise<string>;
  signIn(email: string, password: string): Promise<string>;
}
