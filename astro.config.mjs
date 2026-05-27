// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
// ho installato remark ma per ora lo uso SOLO per l'odinamento automatico delle pagine nella sidebar
import astroExpressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import remarkFixLinks from './src/remark/remark-fix-links.js';
import remarkCallout from './src/remark/remark-fix-Callout.js';
import remarkCardGrid from './src/remark/remark-fix-CardGrid.js';
import remarkTypography from './src/remark/remark-fix-typography.js';
import remarkComponents from './src/remark/remark-fix-components.js';


// https://astro.build/config
export default defineConfig({
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
      title: '',
	    customCss: ['./src/styles/global.css'],
      components: {
        SiteTitle: './src/components/SiteTitle.astro'
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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

  vite: {
    plugins: [tailwindcss()],
  },
});