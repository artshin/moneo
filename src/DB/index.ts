import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Bill from './Models/Bill'
import User from './Models/User'
import BillEntry from './Models/BillEntry'
import BillUser from './Models/BillUser'

import schema from './schema'
import migrations from './migrations'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Bill, User, BillEntry, BillUser],
  actionsEnabled: true
})

export default database
