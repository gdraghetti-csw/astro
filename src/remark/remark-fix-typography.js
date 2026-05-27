import { visit } from 'unist-util-visit';

export default function remarkTypography() {
  return (tree) => {
    visit(tree, 'text', (node) => {
        const match = node.value.match(/heading-(\d+)\s*\|\s*h\d+\s*\|\s*(\d+px)/);

        if (match) {
            const px = match[2];

            node.value = node.value.replace(
            match[0],
            `<span className="text-[${px}]">heading-${match[1]}</span>`
            );
        }
    });
    /* visit(tree, 'table', (table) => {
      table.children.forEach((row) => {
        row.children.forEach((cell) => {

          if (!cell.children) return;

          cell.children.forEach((node) => {
            if (node.type !== 'text') return;

            // -------------------------
            // 1. heading-X | hX | px
            // -------------------------
            node.value = node.value.replace(
              /\|\s*heading-\d+\s*\|\s*h\d+\s*\|\s*(\d+px)\s*\|/g,
              (_, px) => {
                return `| <span className="text-[${px}]">heading</span> |`;
              }
            );

            // -------------------------
            // 2. font-size-*
            // -------------------------
            node.value = node.value.replace(
              /\|\s*(font-size-[a-z]+)\s*\|\s*(\d+px)\s*\|/g,
              (_, name, px) => {
                return `| <span className="text-[${px}]">${name}</span> | ${px} |`;
              }
            );

          });
        });
      });
    }); */
  };
}