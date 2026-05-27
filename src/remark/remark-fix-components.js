/* import { visit } from 'unist-util-visit';

const COMPONENTS = [
  { tag: 'callout', name: 'Callout' },
  { tag: 'cardGrid', name: 'CardGrid' },
  { tag: 'colorButton', name: 'ColorButton' },
  { tag: 'typeDefinition', name: 'TypeDefinition' },
];

export default function remarkComponents() {
  return (tree) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      const comp = COMPONENTS.find(c =>
        c.tag.toLowerCase() === node.name?.toLowerCase()
      );

      if (!comp) return;

      node.name = comp.name;
    });

    visit(tree, 'mdxJsxTextElement', (node) => {
      const comp = COMPONENTS.find(c =>
        c.tag.toLowerCase() === node.name?.toLowerCase()
      );

      if (!comp) return;

      node.name = comp.name;
    });
  };
} */

/* import { visit } from 'unist-util-visit';

export default function remarkComponents() {
  return (tree, file) => {
    
    const used = new Set();
    
    visit(tree, 'mdxJsxFlowElement', (node) => {
      const name = node.name?.toLowerCase();
      
      if (name === 'cardgrid') {
        node.name = 'CardGrid';
        used.add('CardGrid');
      }
      
      if (name === 'callout') {
        node.name = 'Callout';
        used.add('Callout');
      }
      
      if (name === 'colorbutton') {
        node.name = 'ColorButton';
        used.add('ColorButton');
      }
      
      if (name === 'typedefinition') {
        node.name = 'TypeDefinition';
        used.add('TypeDefinition');
      }
    });
    
    // 👇 QUESTO è il pezzo che ti manca davvero
    const importNodes = Array.from(used).map((name) => ({
      type: 'mdxjsEsm',
      value: `import ${name} from 'src/components/${name}.tsx'`,
      data: {
        estree: null,
      },
    }));
    
    tree.children.unshift(...importNodes);

    console.log([...used]);
  };
} */


import { visit } from 'unist-util-visit';

const COMPONENTS = [
  { tag: 'cardGrid', name: 'CardGrid' },
  { tag: 'callout', name: 'Callout' },
  { tag: 'colorButton', name: 'ColorButton' },
  { tag: 'typeDefinition', name: 'TypeDefinition' },
];

export default function remarkComponents() {
  return (tree) => {
    const used = new Set();

    visit(tree, 'mdxJsxFlowElement', (node) => {
      const match = COMPONENTS.find(
        c => c.tag.toLowerCase() === node.name?.toLowerCase()
      );

      if (!match) return;

      node.name = match.name;
      used.add(match.name);
    });

    const importNodes = Array.from(used).map((name) => ({
      type: 'mdxjsEsm',
      value: `import ${name} from 'src/components/${name}.tsx'`,
      data: {
        estree: {
          type: 'Program',
          body: [],
          sourceType: 'module',
        },
      },
    }));

    tree.children.unshift(...importNodes);
    
  };
}