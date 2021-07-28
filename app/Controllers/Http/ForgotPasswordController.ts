import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";

import User from "App/Models/User";

export default class ForgotPasswordController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user!.token = await Hash.make(user!.email);
      user!.token_created_at = DateTime.local();

      await user?.save();
    } catch (err) {
      return response 
        .status(err.status)
        .send({
          error: { message: "Algo não deu certo, esse e-mail existe?" },
        });
    }
  }
}
