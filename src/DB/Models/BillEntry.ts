import { Model } from '@nozbe/watermelondb'
import Bill from './Bill'
import { field, relation } from '@nozbe/watermelondb/decorators'
import Relation from '@nozbe/watermelondb/Relation'

export default class BillEntry extends Model {
  static table = 'bill_entries'

  static associations = {
    bills: { type: 'belongs_to', key: 'bill_id' }
  } as const

  @field('name') name!: string
  @field('price') price!: number
  @relation('bills', 'bill_id') bill!: Relation<Bill>
}
