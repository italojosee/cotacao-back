import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import {
  UserRepository
} from '@repositories';

import { UserValidator } from '@validators';

import { Token } from '@utils';

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

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = await UserValidator.signIn(req.body);

      const isValid = await UserRepository.signIn(email, password);

      if (!isValid)
        return res.status(400).json({ message: 'Invalid password' });

      const user = await UserRepository.findOneById(isValid);

      const token: string = await Token.generateUserToken(isValid);

      return res.status(200).json({ user, token });
    } catch (error) {
      console.log('UserController sign in error', error);
      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });
      return res.status(500).json({ message: error.message });
    }
  }
};

export default new UserController();
