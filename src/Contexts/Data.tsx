import React, { createContext } from 'react'
import { ViewProps } from 'react-native'
import Database from '@DB/index'
import DatabaseBill from '@DB/Models/Bill'
import Bill from '@Models/Bill'
import { Collection } from '@nozbe/watermelondb'

export type DataContextType = {
  bills: Bill[]
  createBill: () => Promise<Bill>
}

type DataContextValue = DataContextType

const DataContextInitialState: DataContextType = {
  bills: [],
  createBill: () => Promise.resolve(new Bill())
}

const DataContext = createContext<DataContextValue>(DataContextInitialState)

type Props = ViewProps & {
  children: React.ReactNode
}

type State = DataContextType

class DataProvider extends React.PureComponent<Props, State> {
  private billsCollection: Collection<DatabaseBill>

  constructor(props: Props) {
    super(props)

    this.state = {
      bills: [],
      createBill: this.createBill
    }

    this.billsCollection = Database.get<DatabaseBill>(DatabaseBill.table)
  }

  componentDidMount() {
    this.observeBills()
  }

  render() {
    const { children } = this.props

    return <DataContext.Provider value={this.state}>{children}</DataContext.Provider>
  }

  private observeBills = async () => {
    const setBills = (bills: Bill[]) => this.setState({ bills })

    const billsObservable = this.billsCollection.query().observe()
    billsObservable.subscribe({
      next(bills) {
        setBills(bills.map(el => new Bill(el)))
      },
      error(err) {
        console.error('something wrong occurred: ' + err)
      },
      complete() {
        console.log('done')
      }
    })
  }

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
}

export { DataContext, DataProvider }
