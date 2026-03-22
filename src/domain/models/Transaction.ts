export type TransactionStatus = 'completed' | 'cancelled'

export interface Transaction {
  id: string
  item: string
  date: string
  price: string
  status: TransactionStatus
  selected: boolean
}
