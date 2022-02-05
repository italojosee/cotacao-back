import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import {
  ProductRepository
} from '@repositories';

import { ProductValidator } from '@validators';

import { Token } from '@utils';

class ProductController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const body = await ProductValidator.store(req.body);

      const result = await ProductRepository.store(body);
      
      return res.json(result);
    } catch (error) {
      console.log('InterestController list error', error);
      return res.status(500).json({ error });
    }
  }
  
  async list(req:Request, res: Response): Promise<Response> {
    try {
      const { page = 0, itemsPerPage = 20 } = req.query;

      const result = await ProductRepository.list(+page, +itemsPerPage);
      
      return res.json(result);
    } catch (error) {
      console.log('InterestController list error', error);
      return res.status(500).json({ error });
    }
  }
};

export default new ProductController();
