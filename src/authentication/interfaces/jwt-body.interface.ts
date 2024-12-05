import { Request as ExpressRequestType } from 'express';

export interface IJWTBody {
  id: string;
  username: string;
  mobile: string;
  deviceId?: string;
  iat: number;
  exp: number;
}

export interface RequestType extends Partial<ExpressRequestType> {
  user?: IJWTBody;
}
