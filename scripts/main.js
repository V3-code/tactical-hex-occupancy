import {
  MODULE_ID,
  isGumNativeOccupancyEnabled,
  isStandaloneOccupancyEnabled,
  registerModuleSettings
} from "../module/config.mjs";
import {
  registerHexOccupancyCanvasLayer
} from "../module/canvas/hex-occupancy-layer.mjs";
import {
  hexOccupancyOverlay,
  registerHexOccupancyCanvasHooks
} from "../module/canvas/hex-occupancy-overlay.js";

let conflictWarningShown = false;

function localize(key, fallback) {
  const value = globalThis.game?.i18n?.localize?.(key);
  return value && value !== key ? value : fallback;
}

export function notifyAboutGumConflict({ force = false } = {}) {
  const conflict = isStandaloneOccupancyEnabled() && isGumNativeOccupancyEnabled();
  if (!conflict) {
    conflictWarningShown = false;
    return false;
  }
  if (!globalThis.game?.user?.isGM || (conflictWarningShown && !force)) return false;

  conflictWarningShown = true;
  globalThis.ui?.notifications?.warn?.(localize(
    "THO.HexOccupancy.GumConflict",
    "GURPS GUM is already displaying its native tactical occupancy markers. Tactical Hex Occupancy will remain inactive to prevent duplicates. Disable the native GUM setting to use the standalone module."
  ), { permanent: true });
  return true;
}

Hooks.once("init", () => {
  registerModuleSettings(game, Hooks);
  registerHexOccupancyCanvasLayer(CONFIG);
  registerHexOccupancyCanvasHooks(Hooks);

  const module = game.modules?.get?.(MODULE_ID);
  if (module) module.api = { hexOccupancyOverlay };
});

Hooks.once("ready", () => {
  notifyAboutGumConflict();
  hexOccupancyOverlay.scheduleRefresh();
});

Hooks.on("tacticalHexOccupancySettingChanged", () => {
  notifyAboutGumConflict({ force: true });
});

// This hook exists only when GUM is the active system. Listening to it keeps
// coexistence seamless without requiring any change to the GUM codebase.
Hooks.on("gumHexOccupancySettingChanged", () => {
  notifyAboutGumConflict({ force: true });
  hexOccupancyOverlay.scheduleRefresh();
});

