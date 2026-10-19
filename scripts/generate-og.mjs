/**
 * 生成社交分享图 public/og-image.png（1200×630）。
 *
 * 用 SVG 描述后交给 sharp 渲染成 PNG。生成结果是提交进仓库的静态资源，
 * 构建流程不依赖它，缺失时站点会回退到头像图。
 *
 * 用法：npm run og
 */
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'public/og-image.png');

const W = 1200;
const H = 630;

const BG = '#0b0c0f';
const FG = '#eceef2';
const MUTED = '#9aa3ae';
const ACCENT = '#5cc8ff';
const BORDER = '#252932';

// 背景网格
const grid = Array.from({ length: W / 60 + 1 }, (_, i) => {
  const x = i * 60;
  return `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${BORDER}" stroke-width="1" opacity="0.45"/>`;
})
  .concat(
    Array.from({ length: H / 60 + 1 }, (_, i) => {
      const y = i * 60;
      return `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${BORDER}" stroke-width="1" opacity="0.45"/>`;
    }),
  )
  .join('');

// 线框立方体标志
const mark = `
  <g transform="translate(72 68) scale(3.1)" fill="none" stroke="${ACCENT}" stroke-width="1.4"
     stroke-linejoin="round" stroke-linecap="round">
    <path d="M16 5 25 10.5v11L16 27 7 21.5v-11z"/>
    <path d="M7 10.5 16 16l9-5.5"/>
    <path d="M16 16v11"/>
  </g>
  <circle cx="121.6" cy="117.6" r="6" fill="${ACCENT}"/>
  <circle cx="121.6" cy="151.7" r="4.6" fill="${FG}"/>
  <circle cx="93.7" cy="134.6" r="4.6" fill="${FG}"/>
  <circle cx="149.5" cy="134.6" r="4.6" fill="${FG}"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g>${grid}</g>
  ${mark}

  <text x="232" y="132" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="76"
        font-weight="700" letter-spacing="2" fill="${FG}">Serate</text>

  <text x="232" y="196" font-family="Microsoft YaHei, Segoe UI, sans-serif" font-size="38"
        font-weight="400" fill="${ACCENT}">空间智能 · 3D Web 渲染</text>

  <line x1="72" y1="300" x2="${W - 72}" y2="300" stroke="${BORDER}" stroke-width="1"/>

  <text x="72" y="368" font-family="Microsoft YaHei, Segoe UI, sans-serif" font-size="30"
        fill="${MUTED}">让空间问题可计算，让三维场景可交互。</text>

  <text x="72" y="418" font-family="Microsoft YaHei, Segoe UI, sans-serif" font-size="30"
        fill="${MUTED}">Spatial Agent · Aholo Viewer · 开源在 GitHub</text>

  <g font-family="Consolas, Courier New, monospace" font-size="24" fill="${MUTED}">
    <text x="72" y="530">github.com/Serate</text>
    <text x="72" y="566">serate.github.io</text>
  </g>

  <rect x="${W - 72 - 6}" y="72" width="6" height="6" fill="${ACCENT}"/>
  <rect x="${W - 72 - 6}" y="88" width="6" height="6" fill="${ACCENT}" opacity="0.55"/>
  <rect x="${W - 72 - 6}" y="104" width="6" height="6" fill="${ACCENT}" opacity="0.25"/>
</svg>`;

await mkdir(dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

console.log('✓ 生成 public/og-image.png (1200×630)');
