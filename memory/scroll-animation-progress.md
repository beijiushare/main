---
name: scroll-animation-progress
description: 首页 GSAP 滚动驱动动画进度 — 主 ScrollTrigger + progress 映射架构
metadata:
  type: project
---

# GSAP 滚动驱动动画进度

## 当前状态（2026/07/20，reactrefactor 分支）

最新 commit: `6a57c76`

### 架构

**放弃** `start: '+=Nvh'` 字符串（被 ScrollTrigger 解析为像素）。

**改用** 主 ScrollTrigger + 暂停动画 + progress 映射：

```
1. section h-[1200vh] 提供滚动空间（实际滚动 1100vh）
2. 每个动画创建为 gsap.to(...paused: true...)
3. 一个主 ScrollTrigger（start:top top, end:bottom bottom）读 self.progress
4. onUpdate 中用 mapP(startRatio, endRatio) 映射全局进度到子范围
   const mapP = (s, e) => p < s ? 0 : p > e ? 1 : (p-s)/(e-s)
5. PathAnimation 子组件独立 ScrollTrigger（同 trigger 元素），互不干扰
```

### 完整时间线（总滚动 1100vh）

```
0%────29%────44%────71%────75%────82%────86%────90%────95%──100%
│标题  │独角  │停顿   │独角   │Path  │飞机  │卡片  │停顿  │组左移
│缩小  │缩小  │       │左移   │显现  │画线  │渐显  │      │+变浅
│      │      │       │780→   │820→  │830→  │910→  │950→  │990→1100
│      │      │       │900vh  │840vh │950vh │950vh │990vh │
│      │      │       │       │      │      │      │      │代码升起
│      │      │       │       │      │      │      │      │1040→1100
```

### 各阶段详情

| 阶段 | 范围 | 映射 | 内容 |
|------|------|------|------|
| 标题缩小 | 0→320vh | `0/1100→320/1100` | 视口居中→左上角(top:20,left:16), scale:1→0.28 |
| 独角缩小 | 0→480vh | `0/1100→480/1100` | scale:1→0.7 |
| 停顿 | 480→780vh | — | 仅轨道平移，无其他变化 |
| 独角左移+淡出 | 780→900vh | `780/1100→900/1100` | x:0→-70vw, opacity:1→0.3 |
| Path容器渐显 | 820→840vh | `820/1100→840/1100` | opacity:0→1, hidden→visible |
| 纸飞机画线 | 830→950vh | `830/1100→950/1100` | 纸飞机沿路径从右往左飞，拖尾线条 |
| 卡片渐显 | 910→950vh | `910/1100→950/1100` | 左下方卡片 opacity:0→1, y:30→0 |
| 停顿 | 950→990vh | — | 线条+卡片定住 |
| 组左移+变浅 | 990→1100vh | `990/1100→1100/1100` | 线条+卡片一起 x:0→-70vw, opacity:1→0.3 |
| 代码挂载 | 1030vh | 独立 ScrollTrigger once | AnimatedCodeBlock 渲染 |
| 代码升起+渐显 | 1040→1100vh | `1040/1100→1100/1100` | y:100vh→0, opacity:0→1 |
| 轨道平移 | 全程 | 全局 progress | x:0→-200vw（背景装饰） |

### 布局

```
[卡片左6%]                    [线条/纸飞机从右往左画]   ← zIndex 5

               [代码块居中 max-w-580px]                 ← zIndex 15

独角兽居中                                                   ← zIndex 1
标题左上角                                                   ← zIndex 20
```

### 已解决的关键问题

1. **'+=Nvh' 被当作像素处理** — 改用主 ScrollTrigger + paused 动画 + progress 映射
2. **代码块跑出视口** — 从水平轨道移到独立层（zIndex 15），不受轨道 x 偏移影响
3. **PathAnimation sectionRef 空值** — useLayoutEffect→useEffect（commit 813fe3d）
4. **PathAnimation invisible 类阻挡** — GSAP visibility:'visible'（同 commit）
5. **标题 FOUC** — CSS translate + GSAP xPercent 同值接管
6. **transformOrigin** — scale 缩小加 `transformOrigin:'top left'` 视觉终点在左上角
7. **Canvas 坐标偏移** — getBoundingClientRect 等比映射回内部坐标
8. **路径镜像** — 坐标 770→70（从右往左画）

### 待解决

1. **ScrollTrigger 多组件协调** — page.tsx 和 PathAnimation 各有一个主 ST，理论上同一 trigger 元素多个 ST 可能产生 scrub 冲突，需测试长时间滚动的稳定性
2. **CursorGrid 在独角兽区域无鼠标响应** — canvas 有 pointer-events-auto
3. **滚动指示器全程不消失**
4. **body-right / utility-zone 未设计**
5. **Vercel 部署未配置**

### 关键技术细节

- **section 高度**: h-[1200vh]，实际滚动 1100vh
- **mapP 函数**: `const mapP = (s, e) => p < s ? 0 : p > e ? 1 : (p-s)/(e-s)`
- **Page.tsx**: 5 个 paused tween + 1 个主 ScrollTrigger
- **PathAnimation.tsx**: 4 个 paused tween（container + planeObj + card + group）+ 1 个主 ST
- **纸飞机动画**: 用 `{p: 0}` 对象做 proxy，gsap.to 驱动 p:0→1，onUpdate 读 p 值更新 SVG
- **tween 清理**: 每个 paused tween 显式 `.kill()`
- **ScrollTrigger.refresh()**: 在 useLayoutEffect/useEffect 末尾调用一次

### 相关文件

- `src/app/page.tsx` — 主页面（5 个 paused tween + ScrollTrigger）
- `src/components/PathAnimation.tsx` — 纸飞机路径动画 + 链接卡片（4 个 paused tween + ST）
- `src/components/ui/animated-code-block.tsx` — 打字机代码块组件
- `D:\cheng\Documents\知识库\obsidian\about_ai\frontend\gsap-scroll-animation.md` — 知识库（含架构经验）
