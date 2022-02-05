import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import {
  UserRepository
} from '@repositories';

import { UserValidator } from '@validators';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const body = await UserValidator.store(req.body);

      const result = await UserRepository.store(body);
      
      return res.json(result);
    } catch (error) {
      console.log('InterestController list error', error);
      return res.status(500).json({ error });
    }
  }
  // async list(req: Request, res: Response): Promise<Response> {
  async list(req:Request, res: Response): Promise<Response> {
    try {
      const { page = 0, itemsPerPage = 20 } = req.query;

      const result = await UserRepository.list(+page, +itemsPerPage);
      
      return res.json(result);
    } catch (error) {
      console.log('InterestController list error', error);
      return res.status(500).json({ error });
    }
  }
};

export default new UserController();
