import React from 'react'
import { storiesOf } from '@storybook/react-native'
import UserListItem from './index'

storiesOf('UI', module).add('User List Item', () => (
  <>
    <UserListItem name="Frank Herbert" />
    <UserListItem name="Leto Atreides" />
    <UserListItem name="Stilgar" />
  </>
))
