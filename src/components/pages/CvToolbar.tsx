'use client'

import Link from 'next/link'

export default function CvToolbar() {
  function handlePrint() {
    const originTitle = document.title
    document.title = 'Beijiu_CV'
    window.print()
    document.title = originTitle
  }

  return (
    <>
      <div className="cv-toolbar">
        <Link href="/" className="toolbar-back">← 返回首页</Link>
        <button className="toolbar-print" onClick={handlePrint}>打印</button>
      </div>
      <style>{`
        .cv-toolbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 24px;
        }
        .toolbar-back {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .toolbar-back:hover {
          color: #000;
        }
        .toolbar-print {
          background: none;
          border: none;
          font-size: 14px;
          color: #444;
          cursor: pointer;
          transition: all 0.2s;
        }
        .toolbar-print:hover {
          border-color: #999;
          background: #f5f5f5;
        }
        @media print {
          .cv-toolbar {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .cv-toolbar {
            padding: 10px 18px;
          }
          .toolbar-print {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
