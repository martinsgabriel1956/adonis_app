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

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  @belongsTo(() => File)
  public file: BelongsTo<typeof File>
}
