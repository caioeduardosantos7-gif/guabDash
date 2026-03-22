import type { ProductRepository } from '../../domain/repositories'
import type { Product } from '../../domain/models'

export class ProductService {
  readonly repo: ProductRepository

  constructor(repo: ProductRepository) {
    this.repo = repo
  }

  async list(): Promise<Product[]> {
    return this.repo.findAll()
  }

  async getById(id: number): Promise<Product | null> {
    return this.repo.findById(id)
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.repo.create(data)
  }

  async update(id: number, data: Omit<Product, 'id'>): Promise<Product> {
    return this.repo.update(id, data)
  }

  async remove(id: number): Promise<void> {
    return this.repo.delete(id)
  }

  async getCategories(): Promise<string[]> {
    return this.repo.getCategories()
  }
}
