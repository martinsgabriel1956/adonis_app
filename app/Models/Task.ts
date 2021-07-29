import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import Project from './Project';
import User from './User';
import File from './File';
export default class Task extends BaseModel {
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
  public due_date: string | DateTime

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
