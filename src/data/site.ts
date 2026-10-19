/**
 * 站点全局配置与内容数据。
 * 这里的项目描述、技术栈与数据均取自 GitHub 上两个公开仓库的真实信息。
 */

export const SITE = {
  name: 'Serate',
  handle: 'lqh2002',
  title: 'Serate — 空间智能与 3D Web 渲染',
  tagline: '空间智能体 Runtime · 3D Gaussian Splatting Web 渲染',
  description:
    'Serate 的个人主页与技术博客：空间智能体（自然语言 → 可校验任务计划 → 真实 GIS 执行）与 3D Gaussian Splatting 的 Web 端渲染。',
  url: 'https://serate.github.io',
  locale: 'zh-CN',
  location: '武汉',
  github: 'https://github.com/Serate',
  avatar: '/avatar.png',
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/#projects', label: '项目' },
  { href: '/blog/', label: '博客' },
  { href: '/tags/', label: '标签' },
] as const;

export interface Project {
  index: string;
  name: string;
  tagline: string;
  badge: string;
  repo: string;
  demo?: string;
  description: string;
  points: string[];
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Spatial Agent',
    tagline: '空间智能体 Runtime',
    badge: 'Python',
    repo: 'https://github.com/Serate/spatial-agent',
    description:
      '把自然语言的空间问题转成结构化任务计划，经工具契约校验后驱动真实 GIS 后端执行，并在前端展示答案、计划、步骤轨迹、数据质量与空间结果。',
    points: [
      '领域路由先于执行：DomainSelector 先在有界能力目录内选择、澄清，或明确说明无匹配，再由 DomainRuntimeHost 隔离运行。',
      '模型不直接触碰后端：所有工具都经过 schema 校验与 ToolRegistry 分发，工具边界因此是可控的。',
      '像元安全门控：DEM 与土地利用的联合分析要求明确的网格对齐证据，证据不足时在工具执行前就解释性阻止。',
      '可观测：中文答案、TaskPlan、执行轨迹、provenance、GeoJSON summary 与 JSON artifact 全量留存。',
    ],
    stack: ['Python', 'GeoPandas', 'Rasterio', 'GDAL / PROJ', 'SQLite', 'Docker'],
  },
  {
    index: '02',
    name: 'Aholo Viewer',
    tagline: '3DGS & Mesh 高性能渲染器',
    badge: 'TypeScript',
    repo: 'https://github.com/Serate/aholo-block-lod',
    demo: 'https://aholojs.dev/',
    description:
      '面向超大 3D Gaussian Splatting 场景的高性能渲染器单体仓库，以 Chunked Streaming LOD 组织数据，把空间索引与遍历策略解耦。',
    points: [
      'Chunked Streaming LOD 数据 schema，用分块流式加载控制超大 3DGS 场景的内存与带宽预算。',
      'Block + tree traversal：定位与剔除策略彼此独立，可以分别演进而不互相牵制。',
      'pnpm 单体仓库：渲染器 TypeScript 源码包与 Astro 文档站、示例、API 文档同处一地。',
      'MIT 许可，配套 CI、lint、format 规范与面向 Agent 的仓库协作说明。',
    ],
    stack: ['TypeScript', 'C / C++', 'WebGL', 'Astro', 'pnpm'],
  },
];

export interface Capability {
  title: string;
  description: string;
  items: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    title: '空间智能与 GIS',
    description:
      '自然语言 → 任务计划 → 真实 GIS 执行。重点覆盖行政区边界、DEM 高程、坡度、土地利用与路网水体分析。',
    items: ['Python', 'GeoPandas', 'Rasterio', 'GDAL / PROJ', 'OSM', 'GeoJSON'],
  },
  {
    title: 'Agent 运行时',
    description:
      '把 Planner、任务计划、工具契约、执行与恢复拆成可独立替换的层，让行为可复现、可审计、可回归。',
    items: ['工具契约', 'Schema 校验', '证据链', '状态机', 'SQLite'],
  },
  {
    title: '3D 与实时渲染',
    description:
      '3D Gaussian Splatting 与 Mesh 的浏览器端渲染，关注分块流式 LOD、几何与相机，以及超大场景的性能预算。',
    items: ['3DGS', 'WebGL', 'LOD', 'TypeScript', 'C / C++'],
  },
  {
    title: '工程与交付',
    description:
      '从原型到可运维服务的完整链路：容器化、CI、持久化状态，以及面向 AI 协作的仓库规范与文档。',
    items: ['Docker', 'GitHub Actions', 'pnpm', 'Astro', '测试与评测'],
  },
];

export const ABOUT = {
  paragraphs: [
    '我做的方向在**空间智能**和 **3D Web 渲染**的交叉地带：一边让机器能读懂地理问题并给出可追溯的答案，一边让大规模三维场景能在浏览器里流畅地跑起来。',
    '我不太喜欢把所有逻辑塞进一个「大模型 + 一堆工具」的黑盒里。更愿意把 Planner、任务计划、工具契约、执行与恢复拆成彼此独立的层——每一层都能单独替换、单独测试、单独观测。当模型判断失误时，损失应该停在一层之内，而不是污染整个链路。',
    '手上的两个项目就是这个思路的具体化：一个把 GIS 工具接到 Agent Runtime 上，一个把超大 3DGS 场景搬进浏览器。两者都在 GitHub 上开源，也在持续演进。',
  ],
  facts: [
    { label: '位置', value: '武汉' },
    { label: 'GitHub', value: '@Serate' },
    { label: '关注方向', value: '空间智能 / 3D 渲染' },
    { label: '本站技术', value: 'Astro + GitHub Pages' },
  ],
} as const;
