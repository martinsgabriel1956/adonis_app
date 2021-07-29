import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";
import moment from 'moment';
import { string } from '@ioc:Adonis/Core/Helpers'
import Mail from "@ioc:Adonis/Addons/Mail";

import User from "App/Models/User";

import ResetPasswordValidator from "App/Validators/ResetPasswordValidator";
import ForgotPasswordValidator from "App/Validators/ForgotPasswordValidator";
export default class ForgotPasswordController {
  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(ForgotPasswordValidator)

      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user!.token = await string.generateRandom(32).toString();
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

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(ResetPasswordValidator)

      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
      .subtract('2', 'days')
      .isAfter(user!.token_created_at);

      if(tokenExpired) return response.badRequest("Token expired");

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();

    } catch (err) {
      return response.badRequest(err.message);
    }
  }
}
