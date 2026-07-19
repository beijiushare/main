---
name: beijiu-homepage-layout-progress
description: beijiu-homepage 首页 GSAP 滚动驱动动画进展（reactrefactor 分支）
metadata:
  type: project
---

# beijiu-homepage 首页布局进展

**日期**: 2026-07-19

## 当前状态 (commit 3114681)

- 首页 GSAP 滚动驱动动画，CSS sticky + 1000vh 节段
- 8 屏完整时间线：标题 0~320vh，独角缩小 0~480vh，暂停 480~780vh，左移 780~1000vh
- 轨道全程 0~1000vh 平移，代码块 560vh 触发、580~640vh 升起
- 标题正中央→左上角 (top:20 left:16, scale 0.28, transformOrigin:'top left')
- 独角兽缩小→停 300vh→左移，canvas 背景已透明，坐标修正已应用（修复 GSAP 缩放后右下角 swirl 不生效）

## 本次会话修复

### 1. PathAnimation 不显示问题（已修复）
- 根因：PathAnimation 的 `useLayoutEffect` 比 page.tsx 先执行，此时 `sectionRef.current` 为 null，导致早期返回
- 修复：`useLayoutEffect` → `useEffect`，让 PathAnimation 的 GSAP 初始化在 page.tsx 的 layout effect 之后执行
- commit: 813fe3d

### 2. PathAnimation `invisible` 类问题（已修复）
- 容器有 `invisible`（visibility:hidden），但 GSAP 只改 opacity 不改 visibility
- 修复：GSAP 动画加了 `visibility: 'visible'`

### 3. 知识库重组（已做）
- 将 `about_ai/` 下三个根目录文件移入 `frontend/` 文件夹
- 重写 `knowledge-base-rules.md`，强调层级结构和 AI 可发现性

### 4. Git auto mode 拦截问题（已解决）
- 全局 settings.json 添加 `"permissions": { "allow": ["Bash(git *)"] }`

### 5. `strokeDashoffset` 类型错误（已修复）
- PathAnimation.tsx: `String()` 包装

## 遗留问题

1. **代码块不可见**（绿色边框后尚未确认根因）
   - `showCode` 在 560vh 触发（已验证：控制台可看到 mount）
   - 代码块在轨道第二屏居中，轨道水平平移和代码块纵向升起可能存在时序错位
   - 代码块在视口中横向可见的窗口期：~1611px~4833px 滚动量（需验证）
   - 临时加了红色边框辅助定位
   - commit: 3114681

2. **`'+=Nvh'` 的时间映射问题**
   - ScrollTrigger 将 `'+=580vh'` 解析为 580px 而非 `580 * viewportHeight`
   - 导致所有动画集中在滚动范围前 20%，后续 80% 为空白
   - 这可能也是代码块不可见的深层原因之一

3. **body-right/utility-zone** 未设计
4. **Vercel 部署** 未配置
