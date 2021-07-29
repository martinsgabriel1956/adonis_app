import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index ({params, request}: HttpContextContract) {
    const { page } = request.qs();

    const tasks = await Task.query().where('project_id', params.id).paginate(page, 10)

    return tasks;
  
  }
  public async store ({params, request}: HttpContextContract) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ]);

    const task = await Task.create({...data, project_id: params.projects_id});

    return task;
  }

  public async show ({params}: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    return task;
  }

  public async update ({params, request}: HttpContextContract) {
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

  public async destroy ({params}: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    await task.delete();
  }
}
