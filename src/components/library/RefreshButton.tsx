'use client'

import { useState } from 'react'

export default function RefreshButton() {
  const [refreshing, setRefreshing] = useState(false)

  async function refresh() {
    if (refreshing) return
    setRefreshing(true)
    try {
      window.location.reload()
    } finally {
      window.setTimeout(() => setRefreshing(false), 1000)
    }
  }

  return (
    <button type="button" className="library-refresh" onClick={refresh} disabled={refreshing}>
      {refreshing ? '刷新中…' : '刷新数据'}
    </button>
  )
}
