import type { Metadata } from 'next'
import Link from 'next/link'
import LibraryMedia from '@/components/library/LibraryMedia'
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
        <p className="library-description">
          记录<Link className="library-inline-link" href="/">北酒</Link>读过的书和看过的电影。
        </p>

        <LibraryMedia id="movies" kind="movies" data={moviesData} />
        <LibraryMedia id="books" kind="books" data={booksData} />

        <footer className="library-footer">
          <p>
            页面参考<a className="library-footer-link" href="https://blog.viki.moe/library" target="_blank" rel="noopener noreferrer">viki的书影音</a>
          </p>
          <p>
            使用了<a className="library-footer-link" href="https://blog.viki.moe/blog-goodies#豆瓣图片代理服务" target="_blank" rel="noopener noreferrer">豆瓣图片代理</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
