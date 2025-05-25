// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import AstroPureIntegration from 'astro-pure';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import UnoCSS from 'unocss/astro';

// Local integrations
import { outputCopier } from './src/plugins/output-copier.ts';
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts';
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts';

// Importar theme e integ directamente en lugar de config
import { theme, integ } from './src/site.config.ts';
const config = { ...theme, integ };

// https://astro.build/config
export default defineConfig({
  // 🔽🔽🔽 CAMBIOS IMPORTANTES AQUÍ 🔽🔽🔽
  site: 'https://germur.github.io',  // Solo el dominio base
  base: '/ufc-blog/',  // Subdirectorio exacto
  trailingSlash: 'ignore',  // Mejor usar 'ignore' para GitHub Pages
  
  // ... (el resto de la configuración se mantiene igual)
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    UnoCSS({ injectReset: true }),
    AstroPureIntegration(config),
    outputCopier({
      integ: ['sitemap', 'pagefind']
    })
  ],

  prefetch: true,

  server: {
    host: true
  },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },

  vite: {
    plugins: []
  }
});