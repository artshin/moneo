import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'
import { children } from '@nozbe/watermelondb/decorators'
import User from './User'

export default class Bill extends Model {
  static table = 'bills'

  static associations = {
    bill_entries: { type: 'has_many', foreignKey: 'bill_entry_id' },
    bill_users: { type: 'has_many', foreignKey: 'bill_id' }
  } as const

  @field('name') name!: string
  @children('users') users!: User[]
}
