// nuclearDrop.js
// Simple white pulse + radial ring explosion

export function runNuclearDrop(ctx) {
  const cx = ctx.canvas.width / 2;
  const cy = ctx.canvas.height / 2;
  let radius = 0;
  const max = 350;

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Explosion ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - radius / max})`;
    ctx.lineWidth = 10;
    ctx.stroke();

    radius += 8;

    if (radius < max) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
