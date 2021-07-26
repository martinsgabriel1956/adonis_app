import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../Models/User";

export default class UsersController {
  public async create({ request }: HttpContextContract) {
    const { name, email, password } = request.only([
      "name",
      "email",
      "password",
    ]);

    await User.create({
      name,
      email,
      password,
    });
  }
  public async index() {
    return User.all();
  }

  public async login({ auth, request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password);
    return token.toJSON();
  }
}
