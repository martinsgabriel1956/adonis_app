import { DateTime } from 'luxon';
import { afterUpdate, BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Application from '@ioc:Adonis/Core/Application';
import Mail from '@ioc:Adonis/Addons/Mail';

import Project from './Project';
import User from './User';
import File from './File';
export default class Task extends BaseModel {
  @beforeCreate()
  @afterUpdate()
  public static async sendNewTaskMail(taskInstance: Task) {
    if(!taskInstance.user_id && !taskInstance.$dirty.user_id) return;

    const { email, name } = await taskInstance.user

    const file = await taskInstance.file

    const { title } = taskInstance;

    await Mail.send(message => {
      message
      .htmlView("emails/forgot_password", {
        name,
        title,
        hasAttachment: !!file,
      })
      .to(email)
      .from("martinsgabriel1956@gmail.com", "Gabriel Martins")
      .subject("Reset Password")

      if(file) {
        message.attach(Application.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        });
      }
    })

    console.log('Running!')
  }

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public project_id: string | number
  
  @column()
  public projectId: string | number
  
  @column()
  public user_id: string | number 
 
  @column()
  public userId: string | number
  
  @column()
  public due_date: DateTime | string

  @column()
  public file_id: string | number

  @column()
  public title: string

  @column()
  public description: string

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  @belongsTo(() => File)
  public file: BelongsTo<typeof File>
}
