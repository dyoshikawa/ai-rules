import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const gitignoreCommand = async (): Promise<void> => {
  const gitignorePath = join(process.cwd(), ".gitignore");

  const rulesFilesToIgnore = [
    "# Generated by rulesync - AI tool configuration files",
    ".github/copilot-instructions.md",
    ".github/instructions/",
    ".cursor/rules/",
    ".clinerules/",
    "CLAUDE.md",
    ".claude/memories/",
    ".roo/rules/",
    "# Support for --base-dir option (any depth)",
    "**/.github/copilot-instructions.md",
    "**/.github/instructions/",
    "**/.cursor/rules/",
    "**/.clinerules/",
    "**/CLAUDE.md",
    "**/.claude/memories/",
    "**/.roo/rules/",
  ];

  let gitignoreContent = "";

  if (existsSync(gitignorePath)) {
    gitignoreContent = readFileSync(gitignorePath, "utf-8");
  }

  const linesToAdd: string[] = [];

  for (const rule of rulesFilesToIgnore) {
    if (!gitignoreContent.includes(rule)) {
      linesToAdd.push(rule);
    }
  }

  if (linesToAdd.length === 0) {
    console.log("✅ .gitignoreは既に最新です");
    return;
  }

  const newContent = gitignoreContent
    ? `${gitignoreContent.trimEnd()}\n\n${linesToAdd.join("\n")}\n`
    : `${linesToAdd.join("\n")}\n`;

  writeFileSync(gitignorePath, newContent);

  console.log(`✅ .gitignoreに${linesToAdd.length}個のルールを追加しました:`);
  for (const line of linesToAdd) {
    if (!line.startsWith("#")) {
      console.log(`  ${line}`);
    }
  }
};
