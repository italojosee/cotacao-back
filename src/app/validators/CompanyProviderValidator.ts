import * as Yup from 'yup';
import { ICompanyprovider, IProviderAgent } from '@interfaces';

class CompanyProviderValidator {
  async store(obj: object): Promise<{
    provider: ICompanyprovider,
    agent: IProviderAgent
  }> {
    const schema = Yup.object().shape({
      provider: Yup.object().shape({
        name: Yup.string().required(),
        cnpj: Yup.string().required(),
        logoUrl: Yup.string(),
      }).nullable(),
      agent: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
      }).nullable()
    });

    return schema.validate(obj);
  }
}


export default new CompanyProviderValidator();