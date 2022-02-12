import { Router } from 'express';
import { CompanyController } from '@controllers';

class ProviderRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router
      .route('/providers')
      .get(CompanyController .list)
      .post(CompanyController .store);

    return this.router;
  }
}

export default new ProviderRoutes();