export const MODULE_ID = "tactical-hex-occupancy";
export const HEX_OCCUPANCY_SETTING = "enabled";
export const GUM_SYSTEM_ID = "gum";
export const GUM_HEX_OCCUPANCY_SETTING = "tacticalHexOccupancyEnabled";

function readBooleanSetting(gameRef, namespace, key) {
  try {
    return gameRef?.settings?.get?.(namespace, key) === true;
  } catch (_error) {
    return false;
  }
}

export function isStandaloneOccupancyEnabled(gameRef = globalThis.game) {
  return readBooleanSetting(gameRef, MODULE_ID, HEX_OCCUPANCY_SETTING);
}

export function isGumNativeOccupancyEnabled(gameRef = globalThis.game) {
  return gameRef?.system?.id === GUM_SYSTEM_ID
    && readBooleanSetting(gameRef, GUM_SYSTEM_ID, GUM_HEX_OCCUPANCY_SETTING);
}

export function shouldUseStandaloneOccupancy(gameRef = globalThis.game) {
  return isStandaloneOccupancyEnabled(gameRef) && !isGumNativeOccupancyEnabled(gameRef);
}

export function registerModuleSettings(gameRef = globalThis.game, hooks = globalThis.Hooks) {
  gameRef?.settings?.register?.(MODULE_ID, HEX_OCCUPANCY_SETTING, {
    name: "THO.Settings.Enabled.Name",
    hint: "THO.Settings.Enabled.Hint",
    scope: "world",
    config: true,
    restricted: true,
    type: Boolean,
    default: true,
    onChange: enabled => hooks?.callAll?.("tacticalHexOccupancySettingChanged", { enabled })
  });
}
