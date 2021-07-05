import React from 'react'
import { storiesOf } from '@storybook/react-native'
import BillComponent from './index'
import Bill from '@Models/Bill'
import User from '@Models/User'
import BillEntry from '@Models/BillEntry'

const bill: Bill = {
  id: '0',
  name: 'Mexico trip'
}

const users: User[] = [
  {
    id: '0',
    name: 'Andy'
  },
  {
    id: '1',
    name: 'John'
  },
  {
    id: '2',
    name: 'Stilgar'
  }
]

const billEntries: BillEntry[] = [
  {
    id: '0',
    name: 'Food'
  },
  { id: '1', name: 'Drinks' }
]

storiesOf('Components', module).add('Bill', () => (
  <BillComponent bill={bill} users={users} billEntries={billEntries} />
))
