import { Application } from 'express';

import UserRoutes from './UserRoutes';
import ProductRoutes from './ProductRoutes';
import ProviderRoutes from './ProviderRoutes';
import QuotationRoutes from './QuotationRoutes';

const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    app.use(API, UserRoutes.getRoutes());
    app.use(API, ProductRoutes.getRoutes());
    app.use(API, ProviderRoutes.getRoutes());
    app.use(API, QuotationRoutes.getRoutes());
  }
}

export default new Routes();
