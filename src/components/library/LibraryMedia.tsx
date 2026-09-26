'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { DoubanItem, DoubanResponse } from '@/lib/douban'
import { useAutoSize } from '@/hooks/useAutoSize'

type MediaSectionProps = {
  id: string
  title: string
  items: DoubanItem[]
  unit: string
}

function MediaSection({ id, title, items, unit }: MediaSectionProps) {
  const pageSize = useAutoSize({ xs: 6, sm: 8 })
  const [pages, setPages] = useState(1)
  const visibleCount = pages * pageSize
  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <div className="library-media-section">
      <div className="library-section-heading">
        <h3 id={id}>{title}</h3>
        <span>({items.length})</span>
      </div>

      <div className="library-grid">
        {visibleItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="library-card group"
          >
            <Image
              src={item.cover}
              alt={item.title}
              width={240}
              height={320}
              className="library-cover"
            />
            <div className="library-card-badge">{title}</div>
            <div className="library-card-gradient" />
            <div className="library-card-info">
              <h4>{item.title}</h4>
              {item.date && <p>标记于 {formatDate(item.date)}</p>}
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="library-more-wrap">
          <button type="button" className="library-more" onClick={() => setPages((value) => value + 1)}>
            加载更多（还剩 {items.length - visibleCount} {unit}）
          </button>
        </div>
      )}
    </div>
  )
}

export default function LibraryMedia({ id, kind, data }: { id: string; kind: 'movies' | 'books'; data: DoubanResponse }) {
  const isMovies = kind === 'movies'
  const labels = isMovies
    ? { title: '影视', unit: '部', collect: '看过', doings: '在看', wish: '想看' }
    : { title: '书籍', unit: '本', collect: '读过', doings: '在读', wish: '想读' }
  const totalCount = data.collect.length + data.wish.length + data.doings.length

  return (
    <section className="library-section" aria-labelledby={id}>
      <h2 id={id}>{labels.title} ({totalCount.toLocaleString()})</h2>
      {totalCount === 0 ? (
        <p className="library-empty">暂无{labels.title}数据</p>
      ) : (
        <>
          {data.collect.length > 0 && <MediaSection id={`${id}-collect`} title={labels.collect} items={data.collect} unit={labels.unit} />}
          {data.doings.length > 0 && <MediaSection id={`${id}-doings`} title={labels.doings} items={data.doings} unit={labels.unit} />}
          {data.wish.length > 0 && <MediaSection id={`${id}-wish`} title={labels.wish} items={data.wish} unit={labels.unit} />}
        </>
      )}
    </section>
  )
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return `${parsed.getFullYear()}.${parsed.getMonth() + 1}.${parsed.getDate()}`
}
