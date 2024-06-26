import { Response, Request, NextFunction, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>;
  middleware?: IMiddleware[];
}

export type ExpressReturnType = Response<unknown, Record<string, unknown>>;
