import { Router } from 'express';
import {  UserController } from '@controllers';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router
      .route('/users')
      .get(UserController.list)
      .post(UserController.store);

    return this.router;
  }
}

export default new UserRoutes();