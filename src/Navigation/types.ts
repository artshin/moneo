import Bill from '@Models/Bill'

export enum Screens {
  Home = 'Home',
  Bill = 'Bill',
  BillEntry = 'BillEntry',
  User = 'User'
}

export interface NavigatorParamList extends Record<string, object | undefined> {
  [Screens.Home]: {}
  [Screens.Bill]: {
    bill: Bill
  }
  [Screens.BillEntry]: {
    bill: Bill
  }
  [Screens.User]: {
    bill: Bill
  }
}
