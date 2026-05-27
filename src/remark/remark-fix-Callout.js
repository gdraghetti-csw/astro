import { visit } from 'unist-util-visit';

export default function remarkCallout() {
  return (tree) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'Callout') return;

      const bodyIndex = node.attributes.findIndex(a => a.name === 'body');

      if (bodyIndex === -1) return;

      const body = node.attributes[bodyIndex];

      // rimuove body
      node.attributes.splice(bodyIndex, 1);

      // lo sposta in children
      node.children = node.children || [];

      node.children.push({
        type: 'mdxJsxTextElement',
        name: null,
        value: body.value?.value || '',
      });
    });
    
  };
}