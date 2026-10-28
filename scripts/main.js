import {
  MODULE_ID,
  isGumSystemActive,
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
  const conflict = isStandaloneOccupancyEnabled() && isGumSystemActive();
  if (!conflict) {
    conflictWarningShown = false;
    return false;
  }
  if (!globalThis.game?.user?.isGM || (conflictWarningShown && !force)) return false;

  conflictWarningShown = true;
  globalThis.ui?.notifications?.warn?.(localize(
    "THO.HexOccupancy.GumConflict",
    "GURPS GUM already includes this feature. Tactical Hex Occupancy remains inactive in GUM worlds to prevent duplication."
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
