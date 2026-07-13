'use client'

import SideRays from '@/components/SideRays'
import ShinyText from '@/components/ShinyText'
import MobileLinks from '@/components/MobileLinks'
import { AnimatedCodeBlock } from '@/components/ui/animated-code-block'

const demoCode = `import { useState, useEffect } from 'react';

function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}`

export default function HomePage() {
  return (
    <>
      {/* 桌面端 */}
      <div className="page">
        <div className="backdrop">
          <SideRays
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2.8}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </div>
        <div className="foreground">
          <div className="top-section">
            <div className="header-bar">
              <div className="identity-zone">
                <h1 className="title">
                  <ShinyText
                    text="✨BEIJIU.TOP"
                    speed={3}
                    color="rgba(210,210,210,0.6)"
                    shineColor="#ffffff"
                    spread={150}
                    direction="left"
                  />
                </h1>
              </div>
              <div className="utility-zone">{/* 待设计 */}</div>
            </div>
            <div className="top-spacer" />
          </div>
          <div className="body-zone">
            <div className="body-left">
              <AnimatedCodeBlock
                code={demoCode}
                theme="terminal"
                title="fetch-data.jsx"
                typingSpeed={50}
                showLineNumbers={true}
                autoPlay={true}
                loop={true}
                language="typescript"
                highlightLines={[1, 4, 10]}
                className="code-block-left"
              />
            </div>
            <div className="body-right">{/* 待设计 */}</div>
          </div>
        </div>
      </div>

      {/* 移动端 */}
      <div className="mobile-page">
        <div className="mobile-hint">请转至桌面端获取更佳体验</div>
        <div className="mobile-overlay">
          <h1 className="mobile-title">Beijiu</h1>
          <MobileLinks />
        </div>
      </div>

      <style>{`
        .page {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .backdrop {
          position: fixed;
          inset: 0;
          z-index: 1;
          background: #0a0a14;
        }
        .foreground {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .top-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .header-bar {
          flex: 3;
          display: flex;
          flex-direction: row;
        }
        .top-spacer {
          flex: 1;
        }
        .identity-zone {
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 2px;
        }
        .utility-zone {
          flex: 1;
        }
        .title {
          margin: 0;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 800;
          letter-spacing: 4px;
          font-family: 'ZSFT-342', 'Segoe UI', system-ui, -apple-system, sans-serif;
          user-select: none;
        }
        .body-zone {
          flex: 2;
          display: flex;
          flex-direction: row;
        }
        .body-left {
          flex: 6;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .body-right {
          flex: 5;
        }
        .code-block-left {
          width: 100%;
          max-width: 560px;
        }
        .mobile-page {
          display: none;
        }
        .mobile-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        .mobile-title {
          font-size: 80px;
          font-weight: 1000;
          font-family: serif;
          color: #2D3A4A;
          text-shadow: 0 1px 3px rgba(255,255,255,0.6);
          margin: 0;
          letter-spacing: 8px;
          user-select: none;
        }
        .mobile-hint {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #333333c5;
          color: #fff;
          text-align: center;
          padding: 12px;
          font-size: 14px;
          z-index: 100;
        }
        @media (max-width: 768px) {
          .page { display: none; }
          .mobile-page {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          .mobile-title { font-size: 40px; }
        }
      `}</style>
    </>
  )
}
