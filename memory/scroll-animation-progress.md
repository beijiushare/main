---
name: scroll-animation-progress
description: 首页 GSAP 滚动驱动动画进度（reactrefactor 分支）
metadata:
  type: project
---

# GSAP 滚动驱动动画进度

## 当前状态（2026/07/19，reactrefactor 分支）

最新提交: `38c8bb0` — fix: 移除 pointermove 边界检测

### 完整时间线（section 高度 1000vh）

```
0──────320──────────480────────────────780────────────1000vh
│ 标题 ──────┤         （左上角缩小完成）
│ 独角缩小 ────────┤   （缩到 0.7 倍）
│                      ███ 停 300vh ███████████████
│                                                      独角左移 ──┤
│ 轨道 ──────────────────────────────────────────────────────────┤
│                                              代码触发■
│                                              代码升起 ─┤
```

### 各阶段详情

| 阶段 | 范围 | 内容 |
|------|------|------|
| 标题 | 0→320vh | 视口居中 → 左上角 top:20 left:16, scale 1→0.28, transformOrigin:'top left' |
| 独角缩小 | 0→480vh | scale 1→0.7 |
| 暂停 | 480→780vh | 独角兽固定不动，轨道继续平移，代码块在此阶段触发 |
| 独角左移 | 780→1000vh | x 0→-70vw, opacity 1→0.3 |
| 轨道 | 0→1000vh | x 0→-200vw 全程平移 |
| 代码块懒加载 | 560vh | 触发 AnimatedCodeBlock 挂载 |
| 代码块升起 | 580→640vh | y 100vh→0, opacity 0→1 |

### 已修复的关键问题

1. **标题 FOUC / 首屏定位错误**（提交 8f91919, 6fce680）
   - CSS 加回 `-translate-x-1/2 -translate-y-1/2` 首屏居中
   - GSAP set 用 `xPercent:-50` 接管同值变换，无跳变
   - sticky 容器内加 `relative w-full h-full` 包裹层，保证绝对定位子元素相对视口

2. **标题动画终点视觉不在左上角**（提交 42ace36）
   - 加 `transformOrigin: 'top left'`，scale 缩小后视觉左上角仍停在 CSS 位置

3. **ShinyText 透明度/颜色**（多次迭代）
   - 最终值: `color="rgba(200,200,200,0.85)"`, `spread=150`

4. **PixelatedCanvas 背景遮挡 CursorGrid**（提交 6594e72）
   - `backgroundColor=""` → 空字符串走 clearRect，canvas 透明，网格透出

5. **Canvas 坐标偏移（右下角 swirl 失效）**（提交未完成）
   - GSAP `scale(0.7)` 后视觉坐标 ≠ 内部坐标
   - 修法: `targetX = ((clientX - rect.left) / rect.width) * cssWidth`

6. **PixelatedCanvas pointer-events 与 CursorGrid 共存**（部分解决）
   - 曾尝试 document 级事件+穿透，但 bottom-right 坐标偏移先暴露了更本质的问题
   - 目前 canvas 自身 pointer-events-auto + canvas 级 pointermove

### 待解决
1. **CursorGrid 光格在独角兽区域无鼠标响应** — 因 canvas 有 `pointer-events-auto`
2. **滚动指示器全程不消失**
3. **body-right / utility-zone 未设计**
4. **Vercel 部署未配置**
5. **PathAnimation 组件在时间线中未重新映射到新节奏**（原 240~400vh 范围需调整）

### 关键经验（已写入知识库）
详见 `D:\cheng\Documents\知识库\obsidian\about_ai\frontend-gsap-scroll-animation.md`
- GSAP transformOrigin 决定缩放最终位置
- CSS translate 与 GSAP transform 的 FOUC 处理
- sticky 容器内 absolute 定位的 containing block 问题
- Canvas 坐标在 GSAP 缩放下的映射修正
- document 级事件实现 pointer-events 共存

### 相关文件
- `src/app/page.tsx` — 主页面（所有 GSAP ScrollTrigger + DOM 结构）
- `src/components/PathAnimation.tsx` — 纸飞机路径动画 + 链接卡片
- `src/components/ScrollIndicator.tsx` — 滚动指示器
- `src/components/ui/pixelated-canvas.tsx` — 像素画布（已修改坐标逻辑）
