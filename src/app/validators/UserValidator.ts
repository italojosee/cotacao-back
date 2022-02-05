import * as Yup from 'yup';
import { IUserStore, IUserLogin } from '@interfaces';

class UserValidator{
  async store(obj: object): Promise<IUserStore> {
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    return schema.validate(obj);
  }
  

  async signIn(obj: IUserLogin): Promise<IUserLogin> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema.validate(obj);
  }
}


export default new UserValidator();