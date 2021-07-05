import DatabaseUser from '@DB/Models/User'

export default class User {
  readonly id: string = ''
  name: string = ''

  constructor(databaseUser?: DatabaseUser) {
    if (databaseUser) {
      this.id = databaseUser.id
      this.name = databaseUser.name
    }
  }
}
