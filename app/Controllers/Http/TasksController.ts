import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator';
import { DateTime } from 'luxon';

type dataProps = {
  user_id: string;
  title: string;
  description: string;
  due_date: string | DateTime;
  file_id: string;
}

export default class TasksController {
  public async index ({params, request}: HttpContextContract) {
    await request.validate(TaskValidator);

    const { page } = request.qs();

    const tasks = await Task.query().where('project_id', params.id).paginate(page, 10)

    return tasks;
  }
  public async store ({params, request}: HttpContextContract) {
    await request.validate(TaskValidator);

    const data: dataProps = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ]);

    const task = await Task.create({...data, project_id: params.projects_id});

    return task;
  }

  public async show ({params, request}: HttpContextContract) {
    await request.validate(TaskValidator);

    const task = await Task.findOrFail(params.id);

    return task;
  }

  public async update ({params, request}: HttpContextContract) {
    await request.validate(TaskValidator);

    const task = await Task.findOrFail(params.id);
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ]);

    task.merge(data);

    await task.save();

    return task;
  }

  public async destroy ({params, request}: HttpContextContract) {
    await request.validate(TaskValidator);
    
    const task = await Task.findOrFail(params.id);

    await task.delete();
  }
}
