import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import User from './User';
import Task from './Task'
export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public user_id: string | number;

  @column()
  public userId: string | null;
  
  @column()
  public taskId: string | null;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Task)
  public task: HasMany<typeof Task>
}