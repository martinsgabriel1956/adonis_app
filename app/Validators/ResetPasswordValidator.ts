import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
		token: schema.string(),
		password: schema.string({ trim: true }, [
			rules.confirmed(),
		])
	});

  public messages = {};
}
