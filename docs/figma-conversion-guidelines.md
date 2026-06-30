# Figma Conversion Guidelines

本文档记录后续把 REVERX WIKI 代码转换为 Figma design library 时的执行标准。开始新一轮转换前，先读取本项目文档与相关源码，再按本文规则构建。

## 基准

- 桌面设计基准固定为 `1920x1080`。
- Figma 中的桌面数值按 `1920px` viewport 解析。
- 先读代码，再建 Figma。不要凭视觉截图或旧 Figma 结构推断组件尺寸。
- 源码优先级高于既有 Figma。既有 Figma 只作为组件资产和已验证模式复用。
- 旧文件或旧 CSS 不能自动作为依据。若文档没有确认旧 layout/CSS 仍有效，不要拿它计算新布局。

## Clamp 规则

全局 clamp 才建立为 Figma variable。局部 clamp 只记录在对应组件描述、规格表或组件旁注中，不发布为全局变量。

每个流动变量保留四项元数据：

```text
CSS: var(--layout-shell-gap)
Formula: clamp(28px, 2.5vw, 42px)
Reference viewport: 1920x1080
Resolved value: 42px
```

计算规则：

- `vw` 按 `1920px` 计算，`vh` 按 `1080px` 计算。
- `clamp(min, preferred, max)` 先计算 preferred，再限制在 min/max 之间。
- 百分比宽度必须按真实父容器计算，不按截图可见区域或旧 wrapper 计算。
- `width:auto`、`height:auto`、`object-fit`、`position:absolute` 等必须读对应 CSS 后再模拟。
- 当 CSS 依赖 padding 后的内容宽度时，Figma 组件也必须使用 padding 后的内部宽度，不要直接用外层 frame 宽度。

## 构建顺序

按由底到上的顺序构建：

1. `Assets`
2. `Primitive`
3. `Action`
4. 组件
5. 组件组合
6. 页面 layout

每一步优先引用已有组件和资产。只有源码确实出现新结构且现有组件无法表达时，才新建组件。

## 页面规则

页面顺序和命名遵循：

- `01 Foundation`
- `02 Assets`
- `03 Primitive`
- `04 Action`
- `05 Background`
- `06 Chrome Component`
- `07 Content Frame Components`
- `08 Content Components`
- `09 Character Content Components`
- `10 Gallery Components`
- `11 Layout / Chrome Shell`
- `12 Layout / World Slug`
- `13 Layout / System Slug`
- `14 Layout / Character Slug`

新建页面时：

- 按所属层级插入，不随手放到末尾。
- 页面名用编号加语义名。
- layout 页只放最终页面模板或关键状态，不把中间技术 wrapper 单独做成 layout 页。
- 同一最终页面有重要状态分支时，放在同一 layout 页内的多个 `1920x1080` frame。

## 资产规则

- 优先使用 Figma 已有 `Assets`。不要自行 upload、重新导入或重画已有 public/svg 资产。
- 从 `public` 导入资产时必须保持原始尺寸和比例。
- 若 `public` 中同一资源有 png/webp 双文件，且源码只引用 webp，Figma 资产也优先保留 webp 对应项。
- 资产归类要做成可 swap 的 component set，而不是散乱单图。
- 常见归类：
  - `Asset / Icon`
  - `Asset / Icon Dark`
  - `Asset / Big Icon`
  - `Asset / Big Icon Dark`
  - `Asset / Figure`
  - `Asset / Figure Display`
  - `Asset / Figure Icon`
  - `Asset / Weapon`
  - `Asset / CG`
- 对于人物立绘这类源码使用 `height: 1000px; width: auto` 的场景，不能直接 swap 原始 figure。应使用规范化 display set，例如 `Asset / Figure Display`：统一外层 wrapper，高度固定，内部图片按原比例缩放并居中。

## 组件规则

- 优先用 component set、variant 和 instance swap 表达可替换内容。
- 不要通过隐藏旧占位图再叠新图来表达常规状态。若一类内容会频繁替换，应整理成 asset variant，然后作为 preferred values 提供给 instance swap。
- primitive 层只表达基础视觉结构。action 层表达交互状态。业务组件只组合它们。
- frame-decor、icon、figure、gallery image、weapon artwork 等已有 asset 或 primitive，应引用实例，不重新画。
- 如果已有 primitive 无法支持内容变化，优先重构 primitive 的属性，而不是在 layout 中 overlay 一个新对象。
- 文本可变的组件应提供 text property。不要隐藏原文字后在外面叠一层 override 文本。

## 自动尺寸和文本撑高

Figma 不能完全自动执行 CSS layout，但必须尽量用 auto layout 和 Hug 内容模拟。

需要特别注意：

- 会随文字长度变化的标题、按钮、标签，应使用 auto layout/Hug，而不是固定 frame 宽度。
- 外层 frame 如果影响后续定位，也要跟随内容宽度变化。
- `YearSwitchButton`、`NextLinkButton`、`EntryHeading` 这类组件，文字变长时 frame-decor 与外层 frame 都要一起变长。
- 若通用 `frame-decor` component 会阻碍 Hug 计算，可以在该组件内自绘同款线框，保证 auto layout 正确。
- 内容区文字应使用固定宽度加自动高度，避免长文被裁切或与后续内容重叠。
- `ContentBox`、`ContentFrame`、section 等需要表达 markdown 正文时，应允许文本内容撑高。不要只拉高纸张而忘记同步装饰线、panel display、corner mark 或 side glyph。
- absolute label 列要给足宽度，尽量和卡片或父容器等宽，避免中英双语 label 换行。

## 图片 wrapper 和 object-fit

源码里的图片显示通常不是简单裁切或原尺寸摆放。必须读 CSS 判断：

- `object-fit: contain` 对应 Figma 中等比例缩放到 wrapper 内完整显示。
- `object-fit: cover` 对应填满 wrapper 并允许裁切。
- `height` 固定、`width:auto` 时，以高度为基准按原图比例计算宽度。
- `width` 固定、`height:auto` 时，以宽度为基准按原图比例计算高度。
- gallery 的 stage/wrapper 是让图片在单页里缩放展示，不是裁切原图。
- figure display 不能让不同人物因为原图尺寸差异在 icon frame 内自由缩放。应通过规范化 wrapper 保持相同显示规则。

## Layout 计算

- layout 宽度必须从当前真实源码计算，尤其是 `ChromeLayout`、sidebar、gap、stage padding 和 content padding。
- sidebar 的层级要按代码 z-index 表达，通常应在 stage/content-frame 之上。
- secret 状态只让自身组件或指定 surface 变暗。不要把整页 layout 背景错误改黑。
- `ContentFrame` 的 content box、icon frame、decor line 要整体按同一个父容器宽度计算。不能只改纸张宽度，线框和 panel display 仍留在旧宽度。
- 页面内容从真实 md 读取。能撑高的组件应放完整 md，不用摘要替代。

## 校验规则

每次构建或重构后至少检查：

- 组件尺寸是否来自源码计算。
- instance 是否引用正确 asset，而不是叠了两个 icon 或两个 image。
- variant/default/active/secret 等状态是否完整，不跳着只做一部分。
- 文本是否换行、裁切、溢出或遮挡。
- 装饰线、double frame、corner mark、side glyph 是否和纸张同步。
- layout 中右侧 icon-frame、next-link、year-switch 是否按真实父容器定位。
- 页面最终 demo 是否存在且可读，不留下多轮临时产物。

## 工作习惯

- 每轮先读相关源码和 CSS，再读 Figma 现状。
- 修改前确认会影响的组件源、实例和 layout。
- 优先修源组件，让实例继承修复；只有特殊页面状态才在实例层覆盖。
- 不确定时先讨论，不直接大改。
- 完成后返回改动范围和关键节点，说明哪些地方是源码计算值，哪些地方是 Figma 表达限制。
