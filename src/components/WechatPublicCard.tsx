'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function WechatPublicCard() {
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    QRCode.toDataURL('http://weixin.qq.com/r/mp/XBcLE5PE8s6Nrddw90JO', {
      width: 100,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    }).then(setQrDataUrl)
  }, [])

  return (
    <>
      <div className="wechat-card">
        <div className="wechat-header">
          <div className="wechat-left">
            <div className="wechat-title">唯北有斗</div>
            <div className="wechat-subtitle">微信公众号：BeijiuX_blog</div>
          </div>
          <div className="wechat-right">
            {qrDataUrl && (
              <img src={qrDataUrl} alt="微信公众号二维码" className="wechat-qrcode" />
            )}
          </div>
        </div>
        <p className="wechat-text">
          这是一段示例文字。暂时不知道写啥。Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt adipisci, cumque ea quae accusamus voluptatem, dolores, qui quasi odio ipsa natus. Dolor nihil eligendi eveniet facilis ratione blanditiis, possimus minus!
        </p>
      </div>
      <style>{`
        .wechat-card {
          background: #fff;
          border-radius: 12px;
          padding: 32px;
          border: 1px solid #000000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        }
        .wechat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #b2b1b1;
          margin-bottom: 20px;
        }
        .wechat-left {
          flex: 1;
        }
        .wechat-title {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }
        .wechat-subtitle {
          font-size: 14px;
          color: #666;
        }
        .wechat-right {
          flex-shrink: 0;
          margin-left: 20px;
        }
        .wechat-qrcode {
          width: 80px;
          height: 80px;
          border-radius: 4px;
        }
        .wechat-text {
          margin: 0;
          font-size: 16px;
          line-height: 1.8;
          color: #333;
          text-align: justify;
        }
        @media (max-width: 480px) {
          .wechat-header {
            align-items: flex-start;
          }
          .wechat-right {
            margin-left: 0;
            margin-top: 6px;
          }
          .wechat-qrcode {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </>
  )
}
