import fs from 'node:fs';
import path from 'node:path';
import { rules } from './test-mdx-rules.js';

const inputDir = './shape';
const outputDir = './dist';

function getAllMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getAllMdxFiles(fullPath));
    }

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = getAllMdxFiles(inputDir);

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const rule of rules) {
    if (rule.find && rule.replace) {
      content = content.replace(rule.find, rule.replace);
    }

    if (rule.test?.(content, filePath)) {
      content = rule.apply(content, filePath);
    }
  }

  const relativePath = path.relative(inputDir, filePath);
  const outputPath = path.join(outputDir, relativePath);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`✔ ${relativePath}`);
}