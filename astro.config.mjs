// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGfm from 'remark-gfm';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
// ho installato remark ma lo uso SOLO per l'odinamento automatico delle pagine nella sidebar
import astroExpressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import remarkFixLinks from './src/remark/remark-fix-links.js';
import remarkCallout from './src/remark/remark-fix-Callout.js';
import remarkCardGrid from './src/remark/remark-fix-CardGrid.js';
import remarkTypography from './src/remark/remark-fix-typography.js';
import remarkComponents from './src/remark/remark-fix-components.js';


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({mode: 'standalone'}),
  integrations: [
    /* astroExpressiveCode(),
    mdx({
        remarkPlugins: [
          remarkComponents,
          remarkFixLinks,
          remarkCallout,
          remarkCardGrid,
          remarkTypography,
        ]
    }), */

    starlight({
      prerender: false, // serve per evitare pagine statiche
      title: '',
	    customCss: ['./src/styles/global.css'],
      components: {
        Header: './src/components/Header.astro'
      },
      /* social: [{ icon: 'github', label: 'Shape GitHub', href: 'https://github.com/centrosoftware-cloud/shape-docs' }], */
      sidebar: [
          {
              label: "Shape",
              items: [
                {
                  autogenerate: {
                    directory: 'shape'
                  }
                }
              ]
          }
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://kit.fontawesome.com/71b1a7f21a.js', // 👈 il tuo kit fontawsome
            crossorigin: 'anonymous'
          }
        }
      ]

    }),
    
    react(),

  ],
  markdown: {
    remarkPlugins: [remarkGfm], // <-- Forza il rendering delle tabelle ovunque
  },
  vite: {
    plugins: [tailwindcss()],
  },
});