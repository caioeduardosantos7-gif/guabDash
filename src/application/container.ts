import { HttpClient } from '../infrastructure/api/HttpClient'
import { ProductRepositoryHttp } from '../infrastructure/repositories/ProductRepositoryHttp'
import { CustomerRepositoryHttp } from '../infrastructure/repositories/CustomerRepositoryHttp'
import { TransactionRepositoryHttp } from '../infrastructure/repositories/TransactionRepositoryHttp'
import { DashboardRepositoryHttp } from '../infrastructure/repositories/DashboardRepositoryHttp'
import { SaleRepositoryHttp } from '../infrastructure/repositories/SaleRepositoryHttp'
import { ProductService } from './usecases/ProductService'
import { CustomerService } from './usecases/CustomerService'
import { TransactionService } from './usecases/TransactionService'
import { DashboardService } from './usecases/DashboardService'
import { SaleService } from './usecases/SaleService'

const httpClient = new HttpClient('')

const productRepo = new ProductRepositoryHttp(httpClient)
const customerRepo = new CustomerRepositoryHttp(httpClient)
const transactionRepo = new TransactionRepositoryHttp(httpClient)
const dashboardRepo = new DashboardRepositoryHttp(httpClient)
const saleRepo = new SaleRepositoryHttp(httpClient)

export const productService = new ProductService(productRepo)
export const customerService = new CustomerService(customerRepo)
export const transactionService = new TransactionService(transactionRepo)
export const dashboardService = new DashboardService(dashboardRepo)
export const saleService = new SaleService(saleRepo)
