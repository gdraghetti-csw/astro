import { visit } from 'unist-util-visit';

export default function remarkLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (node.url?.startsWith('/docs/shape/')) {
        node.url = node.url.replace('/docs', '');
      }
    });
  };
}