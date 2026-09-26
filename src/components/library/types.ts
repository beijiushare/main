export type LibraryStats = {
  collect: number
  wish: number
  doings: number
  total: number
}

export type LibraryStatsData = {
  movies: LibraryStats
  books: LibraryStats
  generatedAt: string
}
