import React from 'react'
import { storiesOf } from '@storybook/react-native'
import BillListItem from './index'

storiesOf('UI', module).add('Bill List Item', () => (
  <>
    <BillListItem bill={{ id: '0', name: 'Mexico' }} />
    <BillListItem bill={{ id: '0', name: 'Party at Vancouver' }} />
    <BillListItem bill={{ id: '0', name: 'Birthday present' }} />
  </>
))
