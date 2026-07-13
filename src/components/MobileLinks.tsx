import Link from 'next/link'
import IconVcard from './icons/IconVcard'
import IconCv from './icons/IconCv'
import IconGithub from './icons/IconGithub'
import IconWechatPublic from './icons/IconWechatPublic'
import IconBlog from './icons/IconBlog'
import IconBilibili from './icons/IconBilibili'

export default function MobileLinks() {
  return (
    <table className="mobile-table">
      <tbody>
        <tr>
          <td>
            <Link href="/vCard" className="mobile-link">
              <IconVcard />vCard
            </Link>
          </td>
          <td>
            <Link href="/cv" className="mobile-link">
              <IconCv />CV
            </Link>
          </td>
          <td>
            <a href="https://github.com/beijiushare" target="_blank" rel="noopener noreferrer" className="mobile-link">
              <IconGithub />GitHub
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <Link href="/WechatPublic" className="mobile-link">
              <IconWechatPublic />公众号
            </Link>
          </td>
          <td>
            <a href="https://blog.beijiu.top/" target="_blank" rel="noopener noreferrer" className="mobile-link">
              <IconBlog />Blog
            </a>
          </td>
          <td>
            <a href="https://space.bilibili.com/3494379710842912" target="_blank" rel="noopener noreferrer" className="mobile-link">
              <IconBilibili />Bilibili
            </a>
          </td>
        </tr>
      </tbody>
      <style>{`
        .mobile-table {
          width: calc(100vw - 40px);
          max-width: 400px;
          border-collapse: collapse;
          border-style: hidden;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgb(0,0,0);
        }
        .mobile-table td {
          width: 33.33%;
          border: 1px solid rgba(0,0,0,0.366);
          padding: 0;
        }
        .mobile-link {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 12px 8px;
          background: #fff;
          color: #444;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .mobile-link:active {
          background: #f5f5f5;
        }
        .mobile-link svg {
          width: 24px;
          height: 24px;
          display: block;
        }
      `}</style>
    </table>
  )
}
