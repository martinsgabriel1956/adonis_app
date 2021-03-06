import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Project from 'App/Models/Project';
import ProjectValidator from 'App/Validators/ProjectValidator';

export default class ProjectsController {
  public async index ({request}: HttpContextContract) {
    const { page } = request.qs();
    
    const projects = await Project.query().preload('user').paginate(page, 10)

    return projects;
  }
  
  public async store ({request, auth}: HttpContextContract) {
    await request.validate(ProjectValidator);
    
    const data = request.only(['title', 'description']);
    
    const project = await Project.create({...data, user_id: auth.user!.id});
    
    return project;
  }
  
  public async show ({ params}: HttpContextContract) {
    const project = await Project.findByOrFail('id', params.id);
    
    await project!.load('user');
    await project!.load('task');
    
    return project;
  }
  
  public async update ({request, params}: HttpContextContract) {
    await request.validate(ProjectValidator);
    
    const project = await Project.findByOrFail('id', params.id);
    const data = request.only(['title', 'description']);
    
    project.merge(data);
    
    await project.save();
    
    return project;
  }
  
  public async destroy ({ params, request }: HttpContextContract) {
    await request.validate(ProjectValidator);

    const project = await Project.findByOrFail('id', params.id);

    await project.delete();

  }
}
