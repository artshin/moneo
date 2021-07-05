import { Model } from '@nozbe/watermelondb'
import { children, field, relation } from '@nozbe/watermelondb/decorators'
import Bill from './Bill'

export default class User extends Model {
  static table = 'users'

  static associations = {
    bill_items: { type: 'has_many', foreignKey: 'bill_id' }
  } as const

  @field('name') name!: string
  @children('bills') bills!: Bill[]
}
