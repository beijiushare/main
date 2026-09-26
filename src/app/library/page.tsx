import type { Metadata } from 'next'
import Link from 'next/link'
import LibraryMedia from '@/components/library/LibraryMedia'
import LibraryStatsCard from '@/components/library/LibraryStatsCard'
import LibraryThemeToggle from '@/components/library/LibraryThemeToggle'
import libraryData from '@/data/library/library.json'
import type { DoubanResponse } from '@/lib/douban'
import './library.css'

const moviesData: DoubanResponse = {
  collect: libraryData.movies.collect,
  wish: libraryData.movies.wish,
  doings: libraryData.movies.doings,
}

const booksData: DoubanResponse = {
  collect: libraryData.books.collect,
  wish: libraryData.books.wish,
  doings: libraryData.books.doings,
}

export const revalidate = 86400

export const metadata: Metadata = {
  title: '书与影',
  description: '书籍与影视记录',
}

export default function LibraryPage() {
  const stats = libraryData.stats

  return (
    <main className="library-page">
      <div className="library-container">
        <header className="library-header">
          <h1 className="library-title">书与影</h1>
          <div className="library-header-actions">
            <LibraryThemeToggle />
            <Link className="library-back" href="/">
              返回首页
            </Link>
          </div>
        </header>
        <p className="library-description">记录读过的书和看过的电影。</p>

        <section className="library-stats" aria-labelledby="library-stats-title">
          <h2 id="library-stats-title">数据统计</h2>
          <div className="library-stats-grid">
            <LibraryStatsCard
              title="书籍"
              stats={stats.books}
              items={[
                { label: '读过', value: stats.books.collect, total: stats.books.total, color: '#3eaf7c' },
                { label: '想读', value: stats.books.wish, total: stats.books.total, color: '#7b61ff' },
              ]}
            />
            <LibraryStatsCard
              title="电影"
              stats={stats.movies}
              items={[
                { label: '看过', value: stats.movies.collect, total: stats.movies.total, color: '#3eaf7c' },
                { label: '在看', value: stats.movies.doings, total: stats.movies.total, color: '#e6a23c' },
                { label: '想看', value: stats.movies.wish, total: stats.movies.total, color: '#7b61ff' },
              ]}
            />
          </div>
        </section>
        <LibraryMedia id="movies" kind="movies" data={moviesData} />
        <LibraryMedia id="books" kind="books" data={booksData} />
      </div>
    </main>
  )
}
