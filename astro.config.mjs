// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGfm from 'remark-gfm';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import starlightDocSearch from '@astrojs/starlight-docsearch';
import dotenv from "dotenv";
dotenv.config();


// ho installato remark ma lo uso SOLO per l'odinamento automatico delle pagine nella sidebar

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({mode: 'standalone'}),
  integrations: [
    starlight({
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://kit.fontawesome.com/71b1a7f21a.js', // kit fontawsome
            crossorigin: 'anonymous'
          }
        }
      ],
      prerender: false, // serve per evitare pagine statiche
      title: '',
      plugins: [
        starlightDocSearch({
          appId: process.env.ALGOLIA_APP_ID || "",
          apiKey: process.env.ALGOLIA_SEARCH_KEY || "",
          indexName: "docs",
        })
      ],
      pagefind: false,
	    customCss: ['./src/styles/global.css'],
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
          // dinamic method, but there is 'Shape' folder that contains all the other folders
          {
              label: "Shape",
              items: [
                {
                  autogenerate: {
                    directory: 'shape'
                  }
                }
              ]
          },
          // static metodh
          /* {
          label: "Introduction",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'introduction',
              }
            }
          ]
        },
        {
          label: "Foundation",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'foundation',
              }
            }
          ]
        },
        {
          label: "Content",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'content',
              }
            }
          ]
        },
        {
          label: "Resources",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'resources',
              }
            }
          ]
        },
        {
          label: "Visual",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'visual',
              }
            }
          ]
        },
        {
          label: "Web",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: 'web',
              }
            }
          ]
        } */
      ],
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