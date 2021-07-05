import React from 'react'
import { storiesOf } from '@storybook/react-native'
import BillEntryListItem from './index'

storiesOf('UI', module).add('Bill Entry List Item', () => (
  <>
    <BillEntryListItem title={'Food'} />
    <BillEntryListItem title={'Drinks'} />
    <BillEntryListItem title={'Smokes'} />
  </>
))
