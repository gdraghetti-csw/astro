import fs from "fs";
import path from "path";
import { algoliasearch } from "algoliasearch";
import dotenv from "dotenv";

dotenv.config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const docsDir = "./src/content/docs";

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

const files = walk(docsDir);

const records = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");


  const relativePath = path.relative(
    path.join("src", "content", "docs", "shape"),
    file
  );

  // questo ternario serve per pulire lo slug, rimuovendo "index.mdx" e sostituendo i backslash con slash
  const cleanedSlug = relativePath.endsWith("index.mdx") ? relativePath.replace("index.mdx", "home") : relativePath.replace(/\\/g, "/").replace(/\.mdx?$/, "");

  // ✅ SPLIT del contenuto
  const chunks = content.match(/.{1,5000}/g) || [];

  const url = cleanedSlug.endsWith("home") ? "/" : `/shape/${cleanedSlug}/`;

  chunks.forEach((chunk, i) => {
    records.push({
      objectID: `${cleanedSlug}-${i}`,
      title: cleanedSlug.endsWith("home") ? "Home" : path.basename(cleanedSlug).replace(/-/g, " "),
      content: chunk,
      url,
    });
  });
});

// ✅ v5: cancelliamo e reinseriamo
await client.clearObjects({
  indexName: "docs",
});

await client.saveObjects({
  indexName: "docs",
  objects: records,
});

console.log("✅ Algolia indexed");