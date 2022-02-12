import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import {
  QuotationRepository
} from '@repositories';

import { QuotationValidator } from '@validators';

class QuotationController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const body = await QuotationValidator.store(req.body);

      const result = await QuotationRepository.store(body);
      
      return res.json(result);
    } catch (error) {
      console.log('QuotationController store error', error);
      return res.status(500).json({ error });
    }
  }
  
  async list(req:Request, res: Response): Promise<Response> {
    try {
      const { page = 0, itemsPerPage = 20 } = req.query;

      const result = await QuotationRepository.list(+page, +itemsPerPage);
      
      return res.json(result);
    } catch (error) {
      console.log('QuotationController list error', error);
      return res.status(500).json({ error });
    }
  }
};

export default new QuotationController();
