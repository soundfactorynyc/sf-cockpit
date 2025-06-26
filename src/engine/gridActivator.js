import { FX_REGISTRY } from "../registry/fx-registry.js";

export function triggerFX(effect, ctx) {
  if (!FX_REGISTRY[effect]) return;
  FX_REGISTRY[effect](ctx);
}
