'use client'

import type { LibraryStats } from './types'

type StatsRow = {
  label: string
  value: number
  total: number
  color: string
}

function StatBar({ label, value, total, color }: StatsRow) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className="library-stat-row">
      <div className="library-stat-label">
        <span>{label}</span>
        <strong>{value.toLocaleString()}</strong>
      </div>
      <div className="library-stat-track" aria-label={`${label} ${value}`}>
        <span style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function LibraryStatsCard({
  title,
  stats,
  items,
}: {
  title: string
  stats: LibraryStats
  items: StatsRow[]
}) {
  return (
    <section className="library-stats-card" aria-label={title}>
      <div className="library-stats-heading">
        <h2>{title}</h2>
        <strong>{stats.total.toLocaleString()}</strong>
      </div>
      <div className="library-stats-total">总计</div>
      <div className="library-stats-rows">
        {items.map((item) => <StatBar key={item.label} {...item} total={stats.total} />)}
      </div>
    </section>
  )
}
