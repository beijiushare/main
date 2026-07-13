'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import VCardContent, { type VCardContentHandle } from '@/components/VCardContent'

export default function VCardPage() {
  const [isZh, setIsZh] = useState(true)
  const contentRef = useRef<VCardContentHandle>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  function toggleLang() {
    setIsZh(!isZh)
  }

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
        const grid = clonedDoc.querySelector('.grid-layout')
        if (grid) {
          (grid as HTMLElement).style.height = 'auto'
          ;(grid as HTMLElement).style.marginTop = '-8px'
          ;(grid as HTMLElement).style.marginBottom = '-9px'
        }
        const qrcodeGrid = clonedDoc.querySelector('.qrcode-grid')
        if (qrcodeGrid) {
          (qrcodeGrid as HTMLElement).style.marginLeft = '0px'
        }
        const name = clonedDoc.querySelector('.name-vcard')
        if (name) {
          (name as HTMLElement).style.marginBottom = '0px'
        }
        const bio = clonedDoc.querySelector('.bio-vcard')
        if (bio) {
          (bio as HTMLElement).style.marginBottom = '0px'
        }
        const qrcodeSection = clonedDoc.querySelector('.qrcode-section')
        if (qrcodeSection) {
          (qrcodeSection as HTMLElement).style.marginLeft = '-16px'
        }
        const card = clonedDoc.querySelector('.card-vcard')
        if (card) {
          (card as HTMLElement).style.transform = 'none'
          ;(card as HTMLElement).style.marginTop = '0px'
          ;(card as HTMLElement).style.marginBottom = '0px'
        }
      },
    })
    const link = document.createElement('a')
    link.download = 'Beijiu_vCard.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="page-container">
          <div className="toolbar">
            <Link href="/" className="back-link">← 返回首页</Link>
            <button className="lang-toggle" onClick={toggleLang}>{isZh ? 'EN' : '中'}</button>
            <button className="save-btn" onClick={saveAsImage}>保存</button>
          </div>
          <div className="card-wrapper" ref={cardWrapperRef}>
            <VCardContent ref={contentRef} isZh={isZh} />
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
          display: grid;
          width: 500px;
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
          margin-left: 12px;
          margin-right: 12px;
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
        .lang-toggle {
          background: none;
          border: none;
          font-size: 12px;
          color: #666;
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .lang-toggle:hover {
          border-color: #999;
          color: #333;
        }
        @media (max-width: 768px) {
          .toolbar {
            position: fixed;
            top: 35px;
            left: 170px;
            z-index: 100;
          }
          .card-wrapper {
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
