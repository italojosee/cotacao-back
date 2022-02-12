import * as Yup from 'yup';
import { IQuotationStore, } from '@interfaces';

class ProductValidator {
  async store(obj: object): Promise<IQuotationStore> {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      dateInit: Yup.date().required(),
      dateEnd: Yup.date(),
      agents: Yup.array().of(Yup.number().required()),
      products: Yup.array().of(Yup.object().shape({
        id: Yup.number().required(),
        quantity: Yup.number().required(),
      }))
    });

    return schema.validate(obj);
  }
}


export default new ProductValidator();