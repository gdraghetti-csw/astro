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
      /* sidebar: [
        {
          label: 'Shape',
          items: [
            { label: 'Introduzione', link: './shape/introduction/overview' },
            { label: 'Foundation',
              items: [
                { label: 'Foundation', link: './shape/foundation/overview' },
                { label: 'Colori', link: './shape/foundation/colors' },
                { label: 'Tipografia', link: './shape/foundation/typography' },
                { label: 'Loghi',
                  items: [
                    { label: 'Loghi', link: './shape/foundation/logos' },
                    { label: 'Azienda', link: './shape/foundation/logos/company' },
                    { label: 'Prodotti', link: './shape/foundation/logos/products' },
                    { label: 'Archivio', link: './shape/foundation/logos/archive' },
                  ] 
                },
                { label: 'Imagery', link: './shape/foundation/imagery' },
                { label: 'Spacing', link: './shape/foundation/spacing' },
              ]
            },
            { label: 'Content',
              items: [
                { label: 'Content', link: './shape/content/overview' },
                { label: 'Tono di voce', link: './shape/content/tone' },
                { label: 'Raccontare Centro Software', link: './shape/content/company' },
                { label: 'Raccontare le persone', link: './shape/content/people' },
                { label: 'Scrivere e-mail', link: './shape/content/email' },
                { label: 'Scrivere manuali', link: './shape/content/manuals' },
                { label: 'Espressioni da evitare', link: './shape/content/avoid-expressions' },
                { label: 'Trovare documenti', link: './shape/content/documents' },
                { label: 'Scrivere sui social', link: './shape/content/social' },
                { label: 'TLDR', link: './shape/content/tldr' },
                { label: 'Dizionario aziendale', link: './shape/content/dictionary' },
              ]
            },
            { label: 'Visual',
              items: [
                { label: 'Visual', link: './shape/visual/overview' },
                { label: 'Social', link: './shape/visual/social' },
                { label: 'Documenti', link: './shape/visual/documents' },
                { label: 'Presentazioni', link: './shape/visual/presentations' },
              ]
            },
            { label: 'Web',
              items: [
                { label: 'Web', link: './shape/web/overview' },
                { label: 'Shape CSS',
                  items: [
                    { label: 'Introduzione', link: './shape/web/getting-started' },
                    { label: 'Tokens', link: './shape/web/tokens' },
                    { label: 'Tipografia', link: './shape/web/typography' },
                    { label: 'Spacing', link: './shape/web/spacing' },
                    { label: 'Utilities', link: './shape/web/utilities' },
                    { label: 'Esempi', link: './shape/web/examples' },
                  ]
                },
              ]
            },
            { label: 'Resources',
              items: [
                { label: 'Resources', link: './shape/resources/overview' },
                { label: 'Modelli documenti', link: './shape/resources/documents' },
                { label: 'Modelli presentazioni', link: './shape/resources/presentations' },
                { label: 'Libreria loghi', link: './shape/resources/logos' },
                { label: 'Immagini e video', link: './shape/resources/media' },
                { label: 'Press kit', link: './shape/resources/press-kit' },
              ]
            },
          ]
        }
      ], */

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