// whiteFire.js
// Premium white projectile with spark pulse and glow trail

export function runWhiteFire(ctx, options = {}) {
  const x = ctx.canvas.width / 2;
  let y = ctx.canvas.height - 80;
  const radius = options.radius || 14;
  const speed = options.speed || 6;
  const trailColor = options.trail || "rgba(255,255,255,0.3)";

  const trail = [];

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Trail logic
    trail.push({ x, y });
    if (trail.length > 20) trail.shift();

    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * (i / 20), 0, Math.PI * 2);
      ctx.fillStyle = trailColor;
      ctx.fill();
    }

    // Main projectile
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.shadowBlur = 25;
    ctx.shadowColor = "white";
    ctx.fill();

    y -= speed;

    if (y > -radius) {
      requestAnimationFrame(animate);
    } else {
      ctx.shadowBlur = 0;
    }
  }

  animate();
}
