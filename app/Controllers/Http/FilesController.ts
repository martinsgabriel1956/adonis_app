import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';

import File from 'App/Models/File';

export default class FilesController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      if(!request.file('file')) return;

      const upload = request.file('file', { size: '2mb' });

      const fileName = `${Date.now()}.${upload!.subtype}`;

      await upload!.move(Application.tmpPath('uploads'), {
        name: fileName,
      });

      if(upload!.state !== 'moved') {
        throw upload?.errors;
      }

      console.log(fileName, upload!.clientName, upload!.type, upload!.subtype);



      const file = await File.create({
        file: fileName,
        name: upload!.clientName,
        type: upload!.type,
        subtype: upload!.subtype,
      })

      
      return file;
    } catch (e) {
      return response
      .status(e.status)
      .send(e.message);
    }
  }
}
