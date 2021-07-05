import DatabaseBillEntry from '@DB/Models/BillEntry'

export default class BillEntry {
  readonly id: string = ''
  name: string = ''

  constructor(databaseBillEntry?: DatabaseBillEntry) {
    if (databaseBillEntry) {
      this.id = databaseBillEntry.id
      this.name = databaseBillEntry.name
    }
  }
}
