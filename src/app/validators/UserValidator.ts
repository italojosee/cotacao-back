import * as Yup from 'yup';
import { IUserStore } from '@interfaces';

class UserValidator{
  async store(obj: object): Promise<IUserStore> {
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    return schema.validate(obj);
  }
}

export default new UserValidator();