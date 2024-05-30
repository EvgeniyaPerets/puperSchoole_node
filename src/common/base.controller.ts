import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { ExpressReturnType, IControllerRoute } from './router.interface';
export { Router } from 'express';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send(res, 200, message);
  }

  public create(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  protected bindRouters(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middleware = route.middleware?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
