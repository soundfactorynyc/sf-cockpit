import { FX_REGISTRY } from './fx-registry.js';

const BUTTON_ACTIONS = {
  fire: { effect: "fireball", icon: "🔥", label: "FIRE" },
  tip: { effect: "moneyBeam", icon: "💸", label: "TIP" },
  chaos: { effect: "bioUnit", icon: "💃", label: "CHAOS" },
  warp: { effect: "sfStrike", icon: "🧠", label: "WARP" },
  rocket: { effect: "propulsion", icon: "🚀", label: "ROCKET" },
  heart: { effect: "cardiac", icon: "❤️", label: "LOVE" }
};

function triggerFX(effectName) {
  if (FX_REGISTRY[effectName]) {
    FX_REGISTRY[effectName]();
  } else {
    console.warn(`Effect "${effectName}" not found.`);
  }
}

function generateCockpitControls() {
  const panel = document.getElementById("launch-panel");
  Object.keys(BUTTON_ACTIONS).forEach((key) => {
    const btn = document.createElement("div");
    btn.classList.add("cockpit-button");
    btn.innerText = BUTTON_ACTIONS[key].icon;
    btn.title = BUTTON_ACTIONS[key].label;
    btn.addEventListener("click", () => triggerFX(BUTTON_ACTIONS[key].effect));
    panel.appendChild(btn);
  });
}

generateCockpitControls();
