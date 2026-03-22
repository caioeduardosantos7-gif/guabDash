import { reactive, ref } from 'vue'
import type { Product } from './models'
import { productService } from '../application/container'

export type { Product }

const products = reactive<Product[]>([])
const categories = ref<string[]>([])
const loaded = ref(false)

export function useProductStore() {
  async function loadProducts() {
    if (loaded.value) return
    const [prods, cats] = await Promise.all([
      productService.list(),
      productService.getCategories(),
    ])
    products.splice(0, products.length, ...prods)
    categories.value = cats
    loaded.value = true
  }

  async function addProduct(data: {
    name: string
    category: string
    price: number
    oldPrice: number | null
    description: string
    tags: string[]
    image: string | null
  }) {
    const created = await productService.create({
      name: data.name,
      category: data.category,
      price: data.price,
      oldPrice: data.oldPrice,
      description: data.description,
      tags: data.tags,
      image: data.image || '/img/products/default.jpg',
    })
    products.unshift(created)
  }

  async function updateProduct(id: number, data: {
    name: string
    category: string
    price: number
    oldPrice: number | null
    description: string
    tags: string[]
    image: string | null
  }) {
    const updated = await productService.update(id, {
      name: data.name,
      category: data.category,
      price: data.price,
      oldPrice: data.oldPrice,
      description: data.description,
      tags: data.tags,
      image: data.image || '/img/products/default.jpg',
    })
    const idx = products.findIndex(p => p.id === id)
    if (idx !== -1) products[idx] = updated
  }

  return { products, categories, loadProducts, addProduct, updateProduct }
}
