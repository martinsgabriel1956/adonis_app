import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import LoginValidator from "App/Validators/LoginValidator";
import UserValidator from "App/Validators/UserValidator";
import User from "../../Models/User";

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    await request.validate(UserValidator);
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
    await request.validate(LoginValidator);

    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password);
    return token.toJSON();
  }
}
