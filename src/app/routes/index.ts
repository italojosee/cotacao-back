import { Application } from 'express';

// import DenunciationRoutes from './DenunciationRoutes';

const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    // app.use(API, DenunciationRoutes.getRoutes());
  }
}

export default new Routes();
