export interface Product {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number | null
  description: string
  tags: string[]
  image: string
}
