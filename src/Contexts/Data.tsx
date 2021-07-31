import React, { createContext } from 'react'
import { ViewProps } from 'react-native'
import Database from '@DB/index'
import DatabaseBill from '@DB/Models/Bill'
import DatabaseBillEntry from '@DB/Models/BillEntry'
import DatabaseUser from '@DB/Models/User'
import DatabaseBillUser from '@DB/Models/BillUser'
import Bill from '@Models/Bill'
import BillEntry from '@Models/BillEntry'
import { Collection } from '@nozbe/watermelondb'
import User from '@Models/User'
import { zip } from 'rxjs'

type CreateBillEntryValues = {
  name: string
  price: string
}

type CreateUserEntryValues = {
  name: string
}

type BillEntriesByBillId = {
  [x: string]: BillEntry[]
}

type UsersById = {
  [x: string]: User
}

type UsersByBillId = {
  [x: string]: User[]
}

export type DataContextType = {
  bills: Bill[]

  billEntries: BillEntry[]
  billEntriesByBillId: BillEntriesByBillId

  users: User[]
  usersByBillId: UsersByBillId

  createBill: () => Promise<Bill>
  createBillEntry: (bill: Bill, values: CreateBillEntryValues) => Promise<BillEntry>
  createUser: (bill: Bill, values: CreateUserEntryValues) => Promise<User>

  updateBill: (bill: Bill) => Promise<void>
}

type DataContextValue = DataContextType

const DataContextInitialState: DataContextType = {
  bills: [],

  billEntries: [],
  billEntriesByBillId: {},

  users: [],
  usersByBillId: {},

  createBill: () => Promise.resolve(new Bill()),
  createBillEntry: (bill: Bill, values: CreateBillEntryValues) => Promise.resolve(new BillEntry()),
  createUser: (bill: Bill, values: CreateUserEntryValues) => Promise.resolve(new User()),

  updateBill: (bill: Bill) => Promise.resolve()
}

const DataContext = createContext<DataContextValue>(DataContextInitialState)

type Props = ViewProps & {
  children: React.ReactNode
}

type State = DataContextType

class DataProvider extends React.PureComponent<Props, State> {
  private billsCollection: Collection<DatabaseBill>
  private billEntriesCollection: Collection<DatabaseBillEntry>
  private usersCollection: Collection<DatabaseUser>
  private billUsersCollection: Collection<DatabaseBillUser>

  constructor(props: Props) {
    super(props)

    this.state = {
      bills: [],

      billEntries: [],
      billEntriesByBillId: {},

      users: [],
      usersByBillId: {},

      createBill: this.createBill,
      createBillEntry: this.createBillEntry,
      createUser: this.createUser,

      updateBill: this.updateBill
    }

    this.billsCollection = Database.get<DatabaseBill>(DatabaseBill.table)
    this.billEntriesCollection = Database.get<DatabaseBillEntry>(DatabaseBillEntry.table)
    this.usersCollection = Database.get<DatabaseUser>(DatabaseUser.table)
    this.billUsersCollection = Database.get<DatabaseBillUser>(DatabaseBillUser.table)
  }

  componentDidMount() {
    this.observeBills()
    this.observeBillEntries()
    this.observeUsers()
  }

  render() {
    const { children } = this.props

    return <DataContext.Provider value={this.state}>{children}</DataContext.Provider>
  }

  private observeBills = async () => {
    const setBills = (bills: Bill[]) => this.setState({ bills })

    this.billsCollection
      .query()
      .observeWithColumns(['name'])
      .subscribe({
        next(values) {
          setBills(values.map(el => new Bill(el)))
        },
        error(err) {
          console.error('something wrong occurred: ' + err)
        },
        complete() {
          console.log('done')
        }
      })
  }

  private observeBillEntries = async () => {
    const setBillEntries = (billEntries: BillEntry[]) => this.setState({ billEntries })
    const setBillEntriesById = (billEntriesByBillId: BillEntriesByBillId) =>
      this.setState({ billEntriesByBillId })

    this.billEntriesCollection
      .query()
      .observe()
      .subscribe({
        next(values) {
          const mapedValues = values.reduce((accumulator, currentValue) => {
            const previousBillEntries = accumulator[currentValue.bill.id!] || []
            return {
              ...accumulator,
              [currentValue.bill.id!]: [...previousBillEntries, new BillEntry(currentValue)]
            }
          }, {} as BillEntriesByBillId)
          setBillEntriesById(mapedValues)
          setBillEntries(values.map(el => new BillEntry(el)))
        },
        error(err) {
          console.error('something wrong occurred: ' + err)
        },
        complete() {
          console.log('done')
        }
      })
  }

  private observeUsers = async () => {
    const setUsers = (users: User[]) => this.setState({ users })
    const setUsersByBillId = (usersByBillId: UsersByBillId) => this.setState({ usersByBillId })

    const usersObservable = this.usersCollection.query().observe()
    const billUsersObservable = this.billUsersCollection.query().observe()

    zip(usersObservable, billUsersObservable).subscribe({
      next([databaseUsers, databaseBillUsers]) {
        const usersById = databaseUsers.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.id]: new User(currentValue)
          }),
          {} as UsersById
        )

        const usersByBillId = databaseBillUsers.reduce((accumulator, currentValue) => {
          const previousBillUsers = accumulator[currentValue.billId] || []
          const user = usersById[currentValue.userId]
          return {
            ...accumulator,
            [currentValue.billId]: [...previousBillUsers, user]
          }
        }, {} as UsersByBillId)

        setUsers(databaseUsers.map(el => new User(el)))
        setUsersByBillId(usersByBillId)
      },
      error(err) {
        console.error('something wrong occurred: ' + err)
      },
      complete() {
        console.log('done')
      }
    })
  }

  // CREQTE QUERIES

  private createBill = async (): Promise<Bill> => {
    return new Promise((resolve, reject) => {
      Database.action(async () => {
        try {
          const newDatabaseBill = await this.billsCollection.create(bill => {
            bill.name = ''
          })
          resolve(new Bill(newDatabaseBill))
        } catch (exception) {
          reject(exception)
        }
      })
    })
  }

  private createBillEntry = async (
    bill: Bill,
    values: CreateBillEntryValues
  ): Promise<BillEntry> => {
    return new Promise((resolve, reject) => {
      Database.action(async () => {
        try {
          const databaseBill = await this.billsCollection.find(bill.id)
          const newDatabaseBillEntry = await this.billEntriesCollection.create(billEntry => {
            billEntry.name = values.name
            billEntry.price = Number(values.price)
            billEntry.bill.set(databaseBill)
          })
          resolve(new BillEntry(newDatabaseBillEntry))
        } catch (exception) {
          reject(exception)
        }
      })
    })
  }

  private createUser = async (bill: Bill, values: CreateUserEntryValues): Promise<User> => {
    return new Promise((resolve, reject) => {
      Database.action(async () => {
        try {
          const databaseBill = await this.billsCollection.find(bill.id)

          const newDatabaseUser = await this.usersCollection.create(user => {
            user.name = values.name
          })

          await this.billUsersCollection.create(billUser => {
            billUser.billId = databaseBill.id
            billUser.userId = newDatabaseUser.id
          })

          resolve(new User(newDatabaseUser))
        } catch (exception) {
          reject(exception)
        }
      })
    })
  }

  // UPDATE QUERIES

  private updateBill = async (bill: Bill): Promise<void> => {
    await Database.action(async () => {
      const databaseBill = await this.billsCollection.find(bill.id)
      await databaseBill.update(record => {
        record.name = bill.name
      })
    })
  }
}

export { DataContext, DataProvider }
