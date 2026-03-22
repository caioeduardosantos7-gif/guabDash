export interface StatItem {
  labelKey: string
  value: string
  delta: string
  up: boolean
}

export interface DashboardStats {
  totalProducts: StatItem
  completedOrders: StatItem
  cancelledOrders: StatItem
  bestProducts: StatItem
}
