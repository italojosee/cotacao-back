import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import {
  CompanyProviderRepository,
  ProviderAgentRepository
} from '@repositories';

import { CompanyProviderValidator } from '@validators';

import { CompanyProvider } from '@models';

class CompanyController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { provider, agent } = await CompanyProviderValidator.store(req.body);

      const existProvider = await CompanyProviderRepository.findOneByCNPJ(provider.cnpj);
      let resultProvider: CompanyProvider;
      if (!existProvider) {
        resultProvider = await CompanyProviderRepository.store(provider);
      } else {
        resultProvider = existProvider;
      }

      const resultAgent = await ProviderAgentRepository.store(agent);

      return res.json({ provider: resultProvider, agent: resultAgent });
    } catch (error) {
      console.log('CompanyController list error', error);
      return res.status(500).json({ error });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 0, itemsPerPage = 20 } = req.query;

      const result = await CompanyProviderRepository.list(+page, +itemsPerPage);

      return res.json(result);
    } catch (error) {
      console.log('CompanyController list error', error);
      return res.status(500).json({ error });
    }
  }
};

export default new CompanyController();
