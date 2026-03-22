import type { Product } from '../models'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create(data: Omit<Product, 'id'>): Promise<Product>
  update(id: number, data: Omit<Product, 'id'>): Promise<Product>
  delete(id: number): Promise<void>
  getCategories(): Promise<string[]>
}
