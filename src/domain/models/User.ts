export interface Company {
  name: string
  document: string
  phone: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  company: Company | null
}
