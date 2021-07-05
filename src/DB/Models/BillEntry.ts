import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class BillEntry extends Model {
  static table = 'bill_entries'

  static associations = {
    bills: { type: 'belongs_to', key: 'bill_id' }
  } as const

  @field('title') name!: string
  @relation('bills', 'bill_id') billId!: string
}
