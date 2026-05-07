import path from 'node:path';

const COMPONENTS = [
  {
    tag: 'callout',
    name: 'Callout',
    importPath: 'components/callout.tsx',
    special: true, // per body -> children
  },
  {
    tag: 'cardGrid',
    name: 'CardGrid',
    importPath: 'components/card-grid.tsx',
  },
  {
    tag: 'colorButton',
    name: 'ColorButton',
    importPath: 'components/cs-color-button.tsx',
  },
  {
    tag: 'typeDefinition',
    name: 'TypeDefinition',
    importPath: 'components/type-definition.tsx',
  },
];

export const ruleIntroductionOver = [
  // 0. template: docs-main --> template: doc
  {
    match: (filePath) => filePath.replace(/\\/g, '/').includes('introduction/overview.mdx'),

    apply: (content) => {
        return content.replace(/template:\s*docs-main/g, 'template: doc');
    }
  },
]

export const rules = [
  // 1. Inserimento IMPORT dopo il frontmatter
  {
    description: 'Aggiunge import React per i componenti usati',
    test: (content) =>
      COMPONENTS.some(c =>
        new RegExp(`<${c.tag}[\\s>]`, 'i').test(content)
      ),

    apply: (content, filePath) => {
      const normalizedPath = filePath.replace(/\\/g, '/');

      const used = COMPONENTS.filter(c =>
        new RegExp(`<${c.tag}[\\s>]`, 'i').test(content)
      );

      const imports = used
        .map(c => {
          const from = path.relative(
            path.dirname(filePath),
            path.join(process.cwd(), 'src', c.importPath)
          );

          // normalizza per MDX
          const cleanPath = from.replace(/\\/g, '/');

          return `import ${c.name} from '${cleanPath.startsWith('.') ? cleanPath : './' + cleanPath}';`;
        })
        .join('\n');

      return content.replace(
        /^---[\s\S]*?---\s*/,
        match => `${match}\n${imports}\n\n`
      );
    }
  },

  // 2. CamelCase del nome del componente
  ...COMPONENTS.map(c => ({
    description: `CamelCase tag ${c.tag}`,
    find: new RegExp(`<\\/?${c.tag}`, 'g'),
    replace: match =>
      match.startsWith('</')
        ? `</${c.name}`
        : `<${c.name}`,
  })),

  
  // 3. Aggiunge client:visible (se non già presente)
  ...COMPONENTS.map(c => ({
    description: `client:visible su ${c.name}`,
    find: new RegExp(`<${c.name}(?![^>]*client:visible)`, 'g'),
    replace: `<${c.name} client:visible`,
  })),

  // 4. SOLO Callout: body -> children
  {
    description: 'Callout: body -> children (supporta JSX multilinea)',
    find: /<Callout([\s\S]*?)\sbody=\{/g,
    replace: '<Callout$1 children={',
  },

  // 5. SOLO cardGrid: link="/docs/shape/..." -> link="/shape/..."
  {
    description: 'cardGrid: link="/docs/shape/..." -> link="/shape/..."',
    find: /link:\s*"\/docs(\/[^"]*)"/g,
    replace: 'link:"$1"',
  }
];

export const calloutLineBreaks = [
  {
    match: (filePath) =>
      filePath.replace(/\\/g, '/').includes('content/company.mdx'),

    apply: (content) => {
      return content.replace(
        /<Callout[\s\S]*?children=\{<>\s*([\s\S]*?)\s*<\/>\}[\s\S]*?\/>/g,
        (match, inner) => {
          const cleaned = inner
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n<br/>\n');

          return match.replace(inner, cleaned);
        }
      );
    }
  }
];
