import * as jwt from 'jsonwebtoken';
export declare class AuthService {
    private username;
    private password;
    private secret;
    private expiresIn;
    login(username: string, password: string): Promise<string | null>;
    verifyToken(token: string): string | jwt.JwtPayload | null;
}
