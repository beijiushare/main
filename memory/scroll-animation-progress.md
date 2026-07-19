---
name: scroll-animation-progress
description: GSAP 滚动驱动首页动画进度（待优化）
metadata:
  type: project
---

# GSAP 滚动驱动首页动画

## 当前状态（2026/07/19）

### 已完成
- ✅ GSAP ScrollTrigger 驱动滚动动画（CSS sticky 方案，无 GSAP pin）
- ✅ 标题 ✨BEIJIU.TOP 居中 → 左上角缩至 0.28（0→60vh）
- ✅ 独角兽 PixelatedCanvas 缩小 1→0.7（0→80vh）
- ✅ 水平轨道左移 200vw（0→300vh），携带代码面板 + 预留面板
- ✅ 代码块从下方升起（200→250vh）
- ✅ CursorGrid 紫色网格背景恢复（z-0，pointer-events 穿透）
- ✅ 独角兽漩涡交互（wrapper pointer-events-none，canvas 自身 auto）
- ✅ 滚动指示器"向下滚动"永久可见
- ✅ `scrub: 0.5` 平滑跟手
- ✅ body 背景色 `#0a0a14`，全局暗色
- ✅ 移动端 <768px 保持原样

### 动画时间线
```
0vh ─────── 60vh ──── 80vh ──────────────── 200vh ── 250vh ──── 300vh ── 400vh
标题 ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
独角兽 ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
轨道 ████████████████████████████████████████████████████████████████░░░░
代码 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████████░░░░░░░░░░░░░░░░░░░
```

### 待办
1. **后半段动画需要优化**（用户说后面再讲）
   - 代码块升起、轨道继续左移的效果可能不够顺
2. body-right 和 utility-zone 仍未设计填充
3. Vercel 项目创建和部署
4. `next build` 有间歇性 PageNotFoundError（Next.js 15.5.x bug，不影响 dev）

### 技术决策
- CSS `position: sticky` 固定视口内容，不用 GSAP pin（避免 pin 协调问题）
- `h-[400vh]` 提供滚动空间
- GSAP 只驱动动画，不参与布局
- `useLayoutEffect` 确保首帧 GSAP set() 在绘制前执行
- Track `pointer-events-none`，各交互元素单独 `pointer-events-auto`

### 相关文件
- `src/app/page.tsx` — 主页面
- `src/components/ScrollIndicator.tsx` — 滚动指示器
- `src/components/ScrollIndicator.css` — 指示器样式+弹跳动画
