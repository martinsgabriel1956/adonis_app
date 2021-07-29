import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
		email: schema.string({}, [
			rules.email(),
		]),
		redirect_url: schema.string({}, [
			rules.url()
		])
	});

  public messages = {};
}
