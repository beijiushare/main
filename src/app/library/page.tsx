import type { Metadata } from 'next'
import Link from 'next/link'
import LibraryMedia from '@/components/library/LibraryMedia'
import DoubanProfileCard from '@/components/library/DoubanProfileCard'
import RefreshButton from '@/components/library/RefreshButton'
import { getDoubanBooks, getDoubanMovies, getDoubanProfile } from '@/lib/douban'
import './library.css'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '书与影',
  description: '书籍与影视记录',
}

export default async function LibraryPage() {
  const [booksData, moviesData, profile] = await Promise.all([
    getDoubanBooks(),
    getDoubanMovies(),
    getDoubanProfile(),
  ])

  return (
    <main className="library-page">
      <div className="library-container">
        <header className="library-header">
          <h1 className="library-title">书与影</h1>
          <div className="library-header-actions">
            <RefreshButton />
            <Link className="library-back" href="/">
              返回首页
            </Link>
          </div>
        </header>
        <p className="library-description">记录读过的书和看过的电影。</p>

        <DoubanProfileCard profile={profile} books={booksData} movies={moviesData} />
        <LibraryMedia id="movies" kind="movies" data={moviesData} />
        <LibraryMedia id="books" kind="books" data={booksData} />
      </div>
    </main>
  )
}
