export interface SalesReportPoint {
  x: number
  y: number
}

export interface SalesReport {
  totalSales: number
  deltaSales: number
  deltaPercent: number
  transactionsSeries: SalesReportPoint[]
  productsSeries: SalesReportPoint[]
}
