import { visit } from 'unist-util-visit';

export default function remarkCardGrid() {
  return (tree) => {
    /* console.log(JSON.stringify(tree, null, 2)); */
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'CardGrid') return;
      
      const cardsAttr = node.attributes.find(a => a.name === 'cards');
      
      if (!cardsAttr) return;
      
      const value = cardsAttr.value;
      
      if (typeof value === 'string') return;
      
      if (value?.value) {
        value.value = value.value.replace(
          /"\/docs(\/shape\/[^"]*)"/g,
          '"$1"'
        );
      }
    });
  };
}