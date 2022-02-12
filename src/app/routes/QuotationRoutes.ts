import { Router } from 'express';
import { QuotationController  } from '@controllers';

class QuotationRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router
      .route('/quotations')
      .get(QuotationController.list)
      .post(QuotationController.store);

    return this.router;
  }
}

export default new QuotationRoutes();