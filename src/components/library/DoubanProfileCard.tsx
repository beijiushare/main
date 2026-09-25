import Image from 'next/image'
import type { DoubanProfile as DoubanProfileType, DoubanResponse } from '@/lib/douban'
import CounterUp from './CounterUp'

export default function DoubanProfileCard({
  profile,
  books,
  movies,
}: {
  profile: DoubanProfileType | null
  books: DoubanResponse
  movies: DoubanResponse
}) {
  if (!profile) {
    return (
      <section className="library-section">
        <h2>豆瓣个人资料</h2>
        <p className="library-empty">暂时无法加载豆瓣个人资料</p>
      </section>
    )
  }

  const bookCollect = profile.books.collect || books.collect.length
  const bookWish = profile.books.wish || books.wish.length
  const bookDoings = profile.books.doings || books.doings.length
  const movieCollect = profile.movies.collect || movies.collect.length
  const movieWish = profile.movies.wish || movies.wish.length
  const movieDoings = profile.movies.doings || movies.doings.length
  const accountAgeYears = Math.round((Date.now() - profile.join_date_at) / (365.25 * 24 * 60 * 60 * 1000))

  return (
    <section className="library-section" id="douban-profile">
      <h2>豆瓣个人资料</h2>
      <div className="library-profile">
        <div className="library-profile-header">
          {profile.avatar && (
            <Image className="library-profile-avatar" src={profile.avatar} alt={profile.name} width={80} height={80} />
          )}
          <div className="library-profile-info">
            <strong>{profile.name}</strong>
            <div className="library-profile-badges">
              <span>加入 {accountAgeYears} 年</span>
              {movieCollect > 0 && <span>看过 {movieCollect} 部</span>}
              {movieWish > 0 && <span>想看 {movieWish} 部</span>}
              {bookCollect > 0 && <span>读过 {bookCollect} 本</span>}
              {bookWish > 0 && <span>想读 {bookWish} 本</span>}
            </div>
            <small>加入于 {profile.join_date}</small>
          </div>
        </div>
        <div className="library-profile-stats">
          <div>
            <span>看过 / 在看 / 想看</span>
            <strong><CounterUp end={movieCollect} /> / <CounterUp end={movieDoings} /> / <CounterUp end={movieWish} /></strong>
          </div>
          <div>
            <span>读过 / 在读 / 想读</span>
            <strong><CounterUp end={bookCollect} /> / <CounterUp end={bookDoings} /> / <CounterUp end={bookWish} /></strong>
          </div>
        </div>
      </div>
    </section>
  )
}
