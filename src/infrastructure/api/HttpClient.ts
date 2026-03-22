type RequestOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

export class HttpClient {
  readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body !== undefined) {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${this.baseUrl}${path}`, config)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const text = await response.text()
    return text ? JSON.parse(text) : ({} as T)
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path)
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, { method: 'POST', body })
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, { method: 'PUT', body })
  }

  delete<T = void>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' })
  }
}
