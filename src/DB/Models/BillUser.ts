import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class BillUser extends Model {
  static table = 'bill_users'

  static associations = {
    bills: { type: 'belongs_to', key: 'bill_id' },
    users: { type: 'belongs_to', key: 'user_id' }
  } as const

  @field('bill_id') billId!: string
  @field('user_id') userId!: string
}
