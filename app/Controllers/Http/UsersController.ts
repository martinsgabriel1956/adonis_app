import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from '../../Models/User';

export default class UsersController {
  public async create({ request }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password']);

    await User.create({
      name,
      email,
      password
    })
  }
  public async index() {
    return User.all()
  }
}
