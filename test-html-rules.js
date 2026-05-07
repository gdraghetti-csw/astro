/* Typography */
export const typography = [
  {
    match: (filePath) => filePath.replace(/\\/g, '/').includes('web/typography.mdx'),

    apply: (content) => {
        return content.replace(
            /\|\s*heading-\d+\s*\|\s*h\d+\s*\|\s*(\d+px)\s*\|/g,
            (match, px) => {

                return match.replace(
                /heading-\d+/,
                (name) => `<span className="text-[${px}]">${name}</span>`
                );
            }
        );
    }
  },
   {
    match: (filePath) => filePath.includes('typography.mdx'),

    apply: (content) => {
            return content.replace(
            /\|\s*(font-size-[a-z]+)\s*\|\s*(\d+px)\s*\|/g,
            (_, name, px) => {
                return `| <span className="text-[${px}]">${name}</span> | ${px} |`;
            }
            );
    }
    }
];