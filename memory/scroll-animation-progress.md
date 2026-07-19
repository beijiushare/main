---
name: scroll-animation-progress
description: 首页 GSAP 滚动驱动首页动画进度（reactrefactor 分支）
metadata:
  type: project
---

# GSAP 滚动驱动动画进度

## 当前状态（2026/07/19，reactrefactor 分支）

最新提交: `1716898` — fix: 标题移到真实左上角 top:8 left:8

目前节段 500vh，完整节奏：

```
0~80vh:     标题 BEIJIU.TOP 居中→左上角(top:8, left:8, scale:0.28)
0~120vh:    独角兽 缩小 (scale:1→0.7)
120~450vh:  独角兽 左移淡出 (x:0→-70vw, opacity→0.3)
0~450vh:    水平轨道 左移 (x:0→-200vw)
240~270vh:  PathAnimation 容器渐显 (opacity 0→1)
270~400vh:  纸飞机沿 S 形路径飞行 (scrub:1.5 产生后延性)
            白色拖尾线条隔 5% 间隙跟在飞机后面
370~400vh:  链接卡片渐显（右侧，6个链接）
370vh:      代码块懒挂载
380~430vh:  代码块从下方升起 (y:100vh→0, opacity→1)
```
> 注意: 上述仅为 GSAP ScrollTrigger 范围，实际视觉进度因 scrub 平滑略有延迟

### 已完成
- 标题初始居中从 GSAP set 改为 CSS `-translate-x-1/2 -translate-y-1/2`，消除 SSR 水合偏右闪烁
- AnimatedCodeBlock 在 370vh 才挂载，消除 Framer Motion 合成层在 `overflow-hidden` 边界处的渲染伪影
- 独角兽拆为两阶段：0→120vh 缩小，120→450vh 左移淡出
- **PathAnimation 组件** — 纸飞机 SVG 沿 S 路径飞行 + 白色拖尾线条 + 6 链接卡片
- 链接图标从 main 分支搬运（自定义 SVG，非 lucide-react）
- 纸飞机路径动画 `scrub: 1.5`，停止滚动后续播/续退
- PathAnimation 容器自带 `opacity-0 invisible`，首帧完全隐藏
- `npm run dev` 可正常运行

### 遗留问题
1. **用户反馈整体动画偏快** — 可能需要更大节段或更小 scrub 值
2. **滚动指示器全程不消失** — 只有 `gsap.set` 没有 `gsap.to`
3. **标题左上角"不够左"** — 已改为 `top:8, left:8`，但用户仍不满意，可能与 CSS `-translate-x-1/2` 和 GSAP transform 相互影响有关
4. **独角兽左移有闪烁感** — 可能因 GSAP transform + PixelatedCanvas canvas 重绘产生
5. **body-right / utility-zone** — 未设计
6. **Vercel 部署** — 未配置
7. **next build 间歇性 bug** — Next.js 15.5.x

### 关键技术决策
- CSS sticky 固定视口，不用 GSAP pin
- 500vh 节段提供滚动空间
- Track `pointer-events-none`，交互元素各自 `pointer-events-auto`
- PathAnimation 独立组件，自带 ScrollTrigger，通过 `sectionRef` prop 关联主节段

### 相关文件
- `src/app/page.tsx` — 主页面
- `src/components/PathAnimation.tsx` — 纸飞机路径动画 + 链接卡片
- `src/components/ScrollIndicator.tsx` — 滚动指示器
