import { Request } from "express";

export default interface AuthenticatedRequest extends Request {
  auth: Auth;
}

interface getTokenFn {
  (): Promise<string>;
}

interface Auth {
  sessionId: string;
  userId: string;
  getToken: getTokenFn;
  claims: {
    azp: string;
    exp: number;
    iat: number;
    iss: string;
    nbf: number;
    sid: string;
    sub: string;
  };
}
