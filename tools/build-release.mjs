import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY = "V3-code/tactical-hex-occupancy";
const ARCHIVE_NAME = "tactical-hex-occupancy.zip";
const DIRECTORIES = ["assets", "lang", "module", "scripts", "styles"];
const FILES = ["README.md", "LICENSE.md"];

export async function buildRelease({ root, output, tag }) {
  const manifest = JSON.parse(await readFile(path.join(root, "module.json"), "utf8"));
  if (tag !== `v${manifest.version}`) {
    throw new Error(`Tag ${tag} does not match module version ${manifest.version}.`);
  }

  const packageRoot = path.join(output, "package");
  await mkdir(packageRoot, { recursive: true });
  for (const directory of DIRECTORIES) {
    await cp(path.join(root, directory), path.join(packageRoot, directory), { recursive: true });
  }
  for (const file of FILES) {
    await cp(path.join(root, file), path.join(packageRoot, file));
  }

  const releaseManifest = {
    ...manifest,
    download: `https://github.com/${REPOSITORY}/releases/download/${tag}/${ARCHIVE_NAME}`
  };
  const serialized = `${JSON.stringify(releaseManifest, null, 2)}\n`;
  await writeFile(path.join(packageRoot, "module.json"), serialized, "utf8");
  await writeFile(path.join(output, "module.json"), serialized, "utf8");
  return releaseManifest;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  const tag = process.argv[2];
  if (!tag) throw new Error("A release tag is required.");
  await buildRelease({ root: process.cwd(), output: path.join(process.cwd(), "dist"), tag });
}
