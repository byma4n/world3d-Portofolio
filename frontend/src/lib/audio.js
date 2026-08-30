// Tiny WebAudio synth for UI/world sound feedback. No external assets.
let ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone({ freq = 440, dur = 0.12, type = "sine", gain = 0.06, slideTo = null }) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  if (slideTo) osc.frequency.linearRampToValueAtTime(slideTo, c.currentTime + dur);
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
}

export function playSound(name) {
  switch (name) {
    case "interact":
      tone({ freq: 520, slideTo: 720, dur: 0.14, type: "triangle", gain: 0.05 });
      break;
    case "collect":
      tone({ freq: 660, dur: 0.1, type: "square", gain: 0.05 });
      setTimeout(() => tone({ freq: 990, dur: 0.12, type: "square", gain: 0.05 }), 90);
      break;
    case "secret":
      tone({ freq: 300, slideTo: 900, dur: 0.4, type: "sawtooth", gain: 0.04 });
      break;
    case "jump":
      tone({ freq: 300, slideTo: 520, dur: 0.12, type: "sine", gain: 0.04 });
      break;
    default:
      tone({ freq: 440, dur: 0.1 });
  }
}
