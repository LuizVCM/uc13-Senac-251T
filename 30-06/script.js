const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, "projeto_completo.txt");

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".vscode",
  ".idea",
  ".turbo",
  ".cache"
]);

const IGNORE_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "projeto_completo.txt"
]);

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
  ".env",
  ".env.example",
  ".html",
  ".css",
  ".scss",
  ".sass",
  ".md",
  ".txt",
  ".yml",
  ".yaml",
  ".xml",
  ".sql",
  ".prisma",
  ".graphql",
  ".gql",
  ".gitignore",
  ".dockerignore"
]);

let output = [];

function isTextFile(filePath) {
  const ext = path.extname(filePath);

  if (TEXT_EXTENSIONS.has(ext)) return true;

  const base = path.basename(filePath);

  return TEXT_EXTENSIONS.has(base);
}

function walk(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (IGNORE_DIRS.has(item)) continue;
      walk(fullPath);
      continue;
    }

    if (IGNORE_FILES.has(item)) continue;

    if (!isTextFile(fullPath)) continue;

    try {
      const content = fs.readFileSync(fullPath, "utf8");

      output.push(
        "=".repeat(100),
        `ARQUIVO: ${path.relative(ROOT_DIR, fullPath)}`,
        "=".repeat(100),
        "",
        content,
        "",
        ""
      );
    } catch (err) {
      output.push(
        "=".repeat(100),
        `ERRO AO LER: ${path.relative(ROOT_DIR, fullPath)}`,
        String(err),
        "",
        ""
      );
    }
  }
}

walk(ROOT_DIR);

fs.writeFileSync(OUTPUT_FILE, output.join("\n"), "utf8");

console.log(`Arquivo gerado com sucesso: ${OUTPUT_FILE}`);