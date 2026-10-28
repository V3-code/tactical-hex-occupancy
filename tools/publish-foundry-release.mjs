import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_URL = "https://foundryvtt.com/_api/packages/release_version/";
const REPOSITORY = "V3-code/tactical-hex-occupancy";

export function buildPayload(manifest, tag, dryRun) {
  if (tag !== `v${manifest.version}`) {
    throw new Error(`Tag ${tag} does not match module version ${manifest.version}.`);
  }
  return {
    id: manifest.id,
    "dry-run": dryRun,
    release: {
      version: manifest.version,
      manifest: `https://github.com/${REPOSITORY}/releases/download/${tag}/module.json`,
      notes: `https://github.com/${REPOSITORY}/releases/tag/${tag}`,
      compatibility: {
        minimum: manifest.compatibility.minimum,
        verified: manifest.compatibility.verified,
        maximum: manifest.compatibility.maximum ?? ""
      }
    }
  };
}

async function submitRelease({ manifest, tag, token, dryRun }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(buildPayload(manifest, tag, dryRun))
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.status !== "success") {
    throw new Error(`Foundry release ${dryRun ? "validation" : "publication"} failed (${response.status}): ${JSON.stringify(result)}`);
  }
  return result;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  const tag = process.argv[2];
  const token = process.env.FOUNDRY_RELEASE_TOKEN;
  if (!tag) throw new Error("A release tag is required.");
  if (!token) throw new Error("FOUNDRY_RELEASE_TOKEN is not configured.");
  const manifest = JSON.parse(await readFile(path.join(process.cwd(), "module.json"), "utf8"));
  await submitRelease({ manifest, tag, token, dryRun: true });
  await submitRelease({ manifest, tag, token, dryRun: false });
}
