/**
 * 下载并自托管网页字体。
 *
 * 站点以中文为主，Google Fonts 的 CDN 在中国大陆不可达，因此把拉丁文子集
 * 下载到 public/fonts/ 本地托管；中文字形走系统字体栈，不下载任何 CJK 字体。
 *
 * 用法：node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = resolve(ROOT, 'public/fonts');
const CSS_OUT = resolve(ROOT, 'src/styles/fonts.css');

// 现代浏览器 UA —— 用它请求才能拿到 woff2 而不是 ttf
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const TARGETS = [
  {
    family: 'Space Grotesk',
    query: 'family=Space+Grotesk:wght@300..700',
    file: 'space-grotesk-latin.woff2',
  },
  {
    family: 'JetBrains Mono',
    query: 'family=JetBrains+Mono:wght@400..700',
    file: 'jetbrains-mono-latin.woff2',
  },
];

// 只要基本拉丁子集（U+0000-00FF），其余子集体积大且中文站点用不上
const LATIN_RANGE = /unicode-range:\s*U\+0000-00FF/;

async function main() {
  await mkdir(FONT_DIR, { recursive: true });
  const faces = [];

  for (const target of TARGETS) {
    const url = `https://fonts.googleapis.com/css2?${target.query}&display=swap`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${target.family}: CSS 请求失败 ${res.status}`);
    const css = await res.text();

    const block = css.split('@font-face').slice(1).find((b) => LATIN_RANGE.test(b));
    if (!block) throw new Error(`${target.family}: 未找到 latin 子集`);

    const fontUrl = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
    if (!fontUrl) throw new Error(`${target.family}: 未找到 woff2 地址`);
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1]?.trim() ?? '400';
    const style = block.match(/font-style:\s*([^;]+);/)?.[1]?.trim() ?? 'normal';

    const bin = await fetch(fontUrl, { headers: { 'User-Agent': UA } });
    if (!bin.ok) throw new Error(`${target.family}: 字体下载失败 ${bin.status}`);
    const buf = Buffer.from(await bin.arrayBuffer());
    await writeFile(resolve(FONT_DIR, target.file), buf);

    faces.push(
      [
        '@font-face {',
        `  font-family: '${target.family}';`,
        `  font-style: ${style};`,
        `  font-weight: ${weight};`,
        '  font-display: swap;',
        `  src: url('/fonts/${target.file}') format('woff2');`,
        `  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+2000-206F, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;`,
        '}',
      ].join('\n'),
    );

    console.log(`✓ ${target.family} -> public/fonts/${target.file} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  const header = [
    '/* 自动生成，请勿手工编辑。',
    ' * 重新生成：node scripts/fetch-fonts.mjs',
    ' * 来源：Google Fonts（仅基本拉丁子集），自托管以避免国内 CDN 不可达。',
    ' */',
    '',
  ].join('\n');

  await writeFile(CSS_OUT, `${header}${faces.join('\n\n')}\n`);
  console.log(`✓ 生成 ${CSS_OUT}`);
}

main().catch((err) => {
  console.error('字体下载失败:', err.message);
  process.exit(1);
});
