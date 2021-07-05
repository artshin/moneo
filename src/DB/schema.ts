import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'bills',
      columns: [{ name: 'name', type: 'string' }]
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'bill_id', type: 'string', isIndexed: true }
      ]
    }),
    tableSchema({
      name: 'bill_entries',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'bill_id', type: 'string', isIndexed: true }
      ]
    }),
    tableSchema({
      name: 'bill_users',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'bill_id', type: 'string', isIndexed: true }
      ]
    })
  ]
})
