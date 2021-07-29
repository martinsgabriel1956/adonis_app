import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env'
import Youch from 'youch';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error: any, { request, response }: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return response.status(error.status).send(error.messages)
    }

    if(Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }
}
