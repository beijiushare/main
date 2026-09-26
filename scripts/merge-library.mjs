import { readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const libraryDir = join(root, 'src', 'data', 'library')

const sources = [
  { category: 'movies', status: 'collect', file: 'movie-collect.json' },
  { category: 'movies', status: 'wish', file: 'movie-wish.json' },
  { category: 'movies', status: 'doings', file: 'movie-doings.json' },
  { category: 'books', status: 'collect', file: 'book-collect.json' },
  { category: 'books', status: 'wish', file: 'book-wish.json' },
]

const emptyCategory = () => ({ collect: [], wish: [], doings: [] })
const data = { movies: emptyCategory(), books: emptyCategory() }

for (const source of sources) {
  const filePath = join(libraryDir, source.file)
  const content = JSON.parse(await readFile(filePath, 'utf8'))
  if (!Array.isArray(content.items)) {
    throw new Error(`${basename(filePath)} 的 items 字段不是数组`)
  }
  data[source.category][source.status] = content.items
}

const count = (items) => items.length
const stats = {
  movies: {
    collect: count(data.movies.collect),
    wish: count(data.movies.wish),
    doings: count(data.movies.doings),
    total: count(data.movies.collect) + count(data.movies.wish) + count(data.movies.doings),
  },
  books: {
    collect: count(data.books.collect),
    wish: count(data.books.wish),
    doings: count(data.books.doings),
    total: count(data.books.collect) + count(data.books.wish) + count(data.books.doings),
  },
  generatedAt: new Date().toISOString(),
}

const output = { ...data, stats }
const outputPath = join(libraryDir, 'library.json')
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

console.log(`Merged ${sources.length} files into ${outputPath}`)
console.log(JSON.stringify(stats, null, 2))
