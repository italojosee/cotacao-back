import { Router } from 'express';
import { ProductController  } from '@controllers';

class ProductRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router
      .route('/products')
      .get(ProductController.list)
      .post(ProductController.store);

    return this.router;
  }
}

export default new ProductRoutes();