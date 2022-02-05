import { Application } from 'express';

import UserRoutes from './UserRoutes';
import ProductRoutes from './ProductRoutes';

const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    app.use(API, UserRoutes.getRoutes());
    app.use(API, ProductRoutes.getRoutes());
  }
}

export default new Routes();
