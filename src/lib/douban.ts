export interface DoubanItem {
  id: string
  title: string
  url: string
  cover: string
  date: string
}

export interface DoubanResponse {
  collect: DoubanItem[]
  wish: DoubanItem[]
  doings: DoubanItem[]
}

export interface DoubanProfile {
  name: string
  avatar: string
  join_date: string
  join_date_at: number
  movies: {
    collect: number
    wish: number
    doings: number
    person: number
  }
  books: {
    collect: number
    wish: number
    doings: number
    person: number
  }
}

const DOUBAN_API_BASE = 'https://api.viki.moe/douban/beijius'

const emptyResponse = (): DoubanResponse => ({ collect: [], wish: [], doings: [] })

async function getDoubanData(path: '/books' | '/movies'): Promise<DoubanResponse> {
  try {
    const response = await fetch(`${DOUBAN_API_BASE}${path}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`Failed to fetch douban ${path}:`, response.statusText)
      return emptyResponse()
    }

    const data = (await response.json()) as Partial<DoubanResponse> | null
    return {
      collect: data?.collect || [],
      wish: data?.wish || [],
      doings: data?.doings || [],
    }
  } catch (error) {
    console.error(`Error fetching douban ${path}:`, error)
    return emptyResponse()
  }
}

export function getDoubanBooks() {
  return getDoubanData('/books')
}

export function getDoubanMovies() {
  return getDoubanData('/movies')
}

export async function getDoubanProfile(): Promise<DoubanProfile | null> {
  try {
    const response = await fetch(`${DOUBAN_API_BASE}/profile`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error('Failed to fetch douban profile:', response.statusText)
      return null
    }

    const data = (await response.json()) as Partial<DoubanProfile> | null
    if (!data?.books || !data?.movies) return null

    return data as DoubanProfile
  } catch (error) {
    console.error('Error fetching douban profile:', error)
    return null
  }
}
