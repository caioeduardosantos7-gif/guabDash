export interface Customer {
  id: number
  name: string
  personType: 'fisica' | 'juridica'
  document: string
  phone: string
  email: string
}
