'use client'

import { useRef } from 'react'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import WechatPublicCard from '@/components/WechatPublicCard'

export default function WechatPublicPage() {
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  async function saveAsImage() {
    if (!cardWrapperRef.current) return
    const el = cardWrapperRef.current
    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#f5f5f5',
      onclone: (clonedDoc) => {
        const wrapper = clonedDoc.querySelector('.card-wrapper')
        if (wrapper) {
          (wrapper as HTMLElement).style.padding = '16px'
          ;(wrapper as HTMLElement).style.background = '#f5f5f5'
        }
      },
    })
    const link = document.createElement('a')
    link.download = 'Beijiu_公众号.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="page-container">
          <div className="toolbar">
            <Link href="/" className="back-link">← 返回首页</Link>
            <button className="save-btn" onClick={saveAsImage}>保存</button>
          </div>
          <div className="card-wrapper" ref={cardWrapperRef}>
            <WechatPublicCard />
          </div>
        </div>
      </div>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #f5f5f5;
        }
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .page-container {
          width: 38%;
          max-width: 560px;
          min-width: 0;
        }
        .back-link {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #000;
        }
        .toolbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        .save-btn {
          background: none;
          border: none;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .save-btn:hover {
          color: #000;
        }
        @media (max-width: 768px) {
          .page-container {
            width: 95%;
          }
        }
      `}</style>
    </>
  )
}
