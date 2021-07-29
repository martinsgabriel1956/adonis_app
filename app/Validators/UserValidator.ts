import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor (protected ctx: HttpContextContract) {}
	
  public schema = schema.create({
		name: schema.string({ trim: true }, [
			rules.unique({ table: 'users', column: 'name'})
		]),
		email: schema.string({}, [
			rules.email(),
			rules.unique({ table: 'users', column: 'email'})
		]),
		password: schema.string({ trim: true }, [
			rules.confirmed(),
			rules.unique({ table: 'users', column: 'password'})
		])
  })
  public messages = {}
}
