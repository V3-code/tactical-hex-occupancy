import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  HEX_OCCUPANCY_SETTING,
  MODULE_ID,
  isGumNativeOccupancyEnabled,
  shouldUseStandaloneOccupancy
} from "../module/config.mjs";

const gameWith = ({ system = "other", standalone = true, gum = false } = {}) => ({
  system: { id: system },
  settings: {
    get(namespace, key) {
      if (namespace === MODULE_ID && key === HEX_OCCUPANCY_SETTING) return standalone;
      if (namespace === "gum" && key === "tacticalHexOccupancyEnabled") return gum;
      return false;
    }
  }
});

test("runs independently of the active game system", () => {
  assert.equal(shouldUseStandaloneOccupancy(gameWith({ system: "dnd5e" })), true);
  assert.equal(shouldUseStandaloneOccupancy(gameWith({ system: "pf2e" })), true);
  assert.equal(shouldUseStandaloneOccupancy(gameWith({ standalone: false })), false);
});

test("yields to GUM's native feature when both are enabled", () => {
  const conflict = gameWith({ system: "gum", standalone: true, gum: true });
  assert.equal(isGumNativeOccupancyEnabled(conflict), true);
  assert.equal(shouldUseStandaloneOccupancy(conflict), false);
  assert.equal(shouldUseStandaloneOccupancy(gameWith({ system: "gum", gum: false })), true);
});

test("ships as a standalone Foundry module with GUM attribution", () => {
  const root = new URL("../", import.meta.url);
  const manifest = JSON.parse(fs.readFileSync(new URL("module.json", root), "utf8"));
  const readme = fs.readFileSync(new URL("README.md", root), "utf8");
  const main = fs.readFileSync(new URL("scripts/main.js", root), "utf8");
  const layer = fs.readFileSync(new URL("module/canvas/hex-occupancy-layer.mjs", root), "utf8");

  assert.equal(manifest.id, MODULE_ID);
  assert.equal(manifest.compatibility.minimum, "12");
  assert.ok(manifest.esmodules.includes("scripts/main.js"));
  assert.match(readme, /GURPS GUM/);
  assert.match(readme, /https:\/\/github\.com\/V3-code\/GURPS-GUM/);
  assert.match(main, /gumHexOccupancySettingChanged/);
  assert.match(main, /THO\.HexOccupancy\.GumConflict/);
  assert.match(layer, /modules\/tactical-hex-occupancy\/assets\/ui\/hex-occupancy-marker-frame\.svg/);
});

