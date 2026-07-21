'use client'

import { useEffect, useState } from 'react'
import CvToolbar from '@/components/pages/CvToolbar'
import CvContent from '@/components/pages/CvContent'

export default function CvPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="cv-wrapper">
        {isMobile && <div className="mobile-overlay" />}
        <div className="cv-container">
          <CvToolbar />
          <CvContent />
        </div>
        {isMobile && (
          <div className="mobile-warning">
            <p>页面不适合小屏，请转至桌面端查看</p>
          </div>
        )}
      </div>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #f5f5f5;
        }
        .cv-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 40px 0;
          box-sizing: border-box;
        }
        .cv-container {
          width: 60%;
          max-width: 900px;
          min-width: 0;
        }
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.336);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 998;
        }
        .mobile-warning {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 999;
        }
        @media print {
          .cv-wrapper {
            padding: 0;
            display: block;
          }
          .cv-container {
            width: 100%;
          }
          .mobile-warning {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
