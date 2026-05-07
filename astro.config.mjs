// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      title: '',
	  customCss: ['./src/styles/global.css'],
    components: {
        SiteTitle: './src/components/SiteTitle.astro'
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
          {
              label: "Shape",
              autogenerate: { directory: "shape" },
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

      }), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});