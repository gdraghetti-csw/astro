import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rules } from './test-mdx-rules.js';
import { ruleIntroductionOver } from './test-mdx-rules.js';
import { calloutLineBreaks } from './test-mdx-rules.js';
import { typography } from './test-html-rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../tina2/content/docs/shape');
const outputDir = path.join(__dirname, 'src/content/docs/shape');


function getAllMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getAllMdxFiles(fullPath));
    }

    if (entry.isFile() && entry.name.endsWith('.mdx') && entry.name !== '.gitkeep.mdx') {
      files.push(fullPath);
    }
  }

  return files;
}

const files = getAllMdxFiles(inputDir);

for (const filePath of files) {
  
  const relativePath = path.relative(inputDir, filePath).replace(/\\/g, '/');
  const outputPath = path.join(outputDir, relativePath);
  let content = fs.readFileSync(filePath, 'utf8');

  if (relativePath === 'introduction/overview.mdx') {
    for (const rule of ruleIntroductionOver) {
      if (rule.match(filePath)) {
        content = rule.apply(content, filePath);
      }
    }
  }
  
  for (const rule of rules) {
    if (rule.find && rule.replace) {
      content = content.replace(rule.find, rule.replace);
    }
    
    if (rule.test?.(content, filePath)) {
      content = rule.apply(content, outputPath);
    }
  }
  
  if (relativePath === 'web/typography.mdx') {
    for (const rule of typography) {
      if (rule.match(filePath)) {
        content = rule.apply(content, outputPath);
      }
    }
  }

  if (relativePath === 'content/company.mdx') {
    for (const rule of calloutLineBreaks) {
      if (rule.match(filePath)) {
        content = rule.apply(content, outputPath);
      }
    }
  }
  
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`✔ ${relativePath}`);
}