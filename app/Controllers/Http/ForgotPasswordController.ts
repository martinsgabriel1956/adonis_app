import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { string } from '@ioc:Adonis/Core/Helpers'


import Mail from "@ioc:Adonis/Addons/Mail";

import User from "App/Models/User";

export default class ForgotPasswordController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      // user!.token = await Hash.make(user!.email);
      user!.token = await string.generateRandom(10).toString();
      user!.token_created_at = DateTime.local();

      await user?.save();

      await Mail.send((message) => {
        message
          .htmlView("emails/forgot_password", {
            email: email,
            token: user!.token,
            link: ``
          })
          .to(user.email)
          .from("martinsgabriel1956@gmail.com", "Gabriel Martins")
          .subject("Reset Password");
      });
    } catch (err) {
      return response.badRequest(err.message);
    }
  }
}
