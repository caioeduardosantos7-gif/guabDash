import { reactive } from 'vue'
import type { Product } from './models'

export type { Product }

const products = reactive<Product[]>([
  { id: 1, name: 'Vestido Midi Floral', category: 'Vestidos', price: 289.90, oldPrice: 389.90, description: 'Vestido midi com estampa floral exclusiva, tecido fluido 100% viscose. Perfeito para ocasiões especiais.', tags: ['Floral', 'Midi', 'Viscose', 'Verão'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop' },
  { id: 2, name: 'Blusa Linho Off-White', category: 'Blusas', price: 159.00, description: 'Blusa ampla em linho natural, corte oversized com acabamento premium. Versátil e atemporal.', tags: ['Linho', 'Oversized', 'Básico'], image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop' },
  { id: 3, name: 'Calça Wide Leg Alfaiataria', category: 'Calças', price: 349.90, description: 'Calça wide leg em tecido de alfaiataria com caimento impecável. Alta na cintura.', tags: ['Alfaiataria', 'Wide Leg', 'Cintura Alta'], image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop' },
  { id: 4, name: 'Vestido Slip Dress Cetim', category: 'Vestidos', price: 219.00, oldPrice: 279.00, description: 'Slip dress em cetim acetinado, estilo minimalista com alças finas e corte reto.', tags: ['Cetim', 'Minimalista', 'Slip Dress'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop' },
  { id: 5, name: 'Bolsa Tote Canvas', category: 'Acessórios', price: 189.00, description: 'Bolsa tote em canvas resistente com detalhes em couro vegano. Espaçosa para o dia a dia.', tags: ['Canvas', 'Couro Vegano', 'Tote'], image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop' },
  { id: 6, name: 'Blusa Cropped Tricô', category: 'Blusas', price: 199.90, description: 'Blusa cropped em tricô canelado com manga longa. Textura delicada e acabamento artesanal.', tags: ['Tricô', 'Cropped', 'Inverno'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop' },
  { id: 7, name: 'Calça Jeans Reta', category: 'Calças', price: 259.00, oldPrice: 320.00, description: 'Calça jeans corte reto, lavagem clara clássica. O básico sofisticado que nunca sai de moda.', tags: ['Jeans', 'Reta', 'Clássico'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop' },
  { id: 8, name: 'Colar Dourado Minimalista', category: 'Acessórios', price: 89.90, description: 'Colar delicado banhado a ouro 18k com pingente geométrico. Perfeito para qualquer look.', tags: ['Dourado', 'Minimalista', 'Banhado'], image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=500&fit=crop' },
])

const categories = ['Vestidos', 'Blusas', 'Calças', 'Acessórios']

export function useProductStore() {
  function addProduct(data: {
    name: string
    category: string
    price: number
    oldPrice: number | null
    description: string
    tags: string[]
    image: string | null
  }) {
    products.unshift({
      id: Date.now(),
      name: data.name,
      category: data.category,
      price: data.price,
      oldPrice: data.oldPrice,
      description: data.description,
      tags: data.tags,
      image: data.image || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop',
    })
  }

  function updateProduct(id: number, data: {
    name: string
    category: string
    price: number
    oldPrice: number | null
    description: string
    tags: string[]
    image: string | null
  }) {
    const idx = products.findIndex(p => p.id === id)
    if (idx === -1) return
    products[idx] = {
      ...products[idx],
      name: data.name,
      category: data.category,
      price: data.price,
      oldPrice: data.oldPrice,
      description: data.description,
      tags: data.tags,
      image: data.image || products[idx].image,
    }
  }

  return { products, categories, addProduct, updateProduct }
}
