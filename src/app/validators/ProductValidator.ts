import * as Yup from 'yup';
import { IProductStore,  } from '@interfaces';

class ProductValidator{
  async store(obj: object): Promise<IProductStore> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      sku: Yup.string(),
    });

    return schema.validate(obj);
  }
}


export default new ProductValidator();