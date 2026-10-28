import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildRelease } from "../tools/build-release.mjs";
import { buildPayload } from "../tools/publish-foundry-release.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, "$1"));

test("builds an immutable manifest for the tagged release", async () => {
  const output = await mkdtemp(path.join(os.tmpdir(), "tho-release-"));
  try {
    const manifest = JSON.parse(await readFile(path.join(root, "module.json"), "utf8"));
    const tag = `v${manifest.version}`;
    const release = await buildRelease({ root, output, tag });
    const packaged = JSON.parse(await readFile(path.join(output, "package", "module.json"), "utf8"));
    assert.equal(release.download, `https://github.com/V3-code/tactical-hex-occupancy/releases/download/${tag}/tactical-hex-occupancy.zip`);
    assert.deepEqual(packaged, release);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});

test("builds Foundry API validation and publication payloads", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, "module.json"), "utf8"));
  const tag = `v${manifest.version}`;
  const validation = buildPayload(manifest, tag, true);
  const publication = buildPayload(manifest, tag, false);
  assert.equal(validation.id, "tactical-hex-occupancy");
  assert.equal(validation["dry-run"], true);
  assert.equal(publication["dry-run"], false);
  assert.equal(publication.release.manifest, `https://github.com/V3-code/tactical-hex-occupancy/releases/download/${tag}/module.json`);
  assert.deepEqual(publication.release.compatibility, { minimum: "12", verified: "14", maximum: "" });
});
