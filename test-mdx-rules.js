const COMPONENTS = [
  {
    tag: 'callout',
    name: 'Callout',
    importPath: '../../../../components/callout.tsx',
    special: true, // per body -> children
  },
  {
    tag: 'cardGrid',
    name: 'CardGrid',
    importPath: '../../../../components/card-grid.tsx',
  },
  {
    tag: 'colorButton',
    name: 'ColorButton',
    importPath: '../../../../components/cs-color-button.tsx',
  },
  {
    tag: 'typeDefinition',
    name: 'TypeDefinition',
    importPath: '../../../../components/type-definition.tsx',
  },
];

export const rules = [
  // 1. Inserimento IMPORT dopo il frontmatter
  {
    description: 'Aggiunge import React per i componenti usati',
    test: (content) =>
      COMPONENTS.some(c =>
        new RegExp(`<${c.tag}[\\s>]`, 'i').test(content)
      ),

    apply: (content) => {
      const used = COMPONENTS.filter(c =>
        new RegExp(`<${c.tag}[\\s>]`, 'i').test(content)
      );

      const imports = used
        .map(
          c => `import ${c.name} from '${c.importPath}';`
        )
        .join('\n');

      // Inserisce subito dopo il frontmatter
      return content.replace(
        /^---[\s\S]*?---\s*/,
        match => `${match}\n${imports}\n\n`
      );
    },
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
