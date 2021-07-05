import DatabaseBill from '@DB/Models/Bill'

export default class Bill {
  readonly id: string = ''
  name: string = ''

  constructor(databaseBill?: DatabaseBill) {
    if (databaseBill) {
      this.id = databaseBill.id
      this.name = databaseBill.name
    }
  }
}
