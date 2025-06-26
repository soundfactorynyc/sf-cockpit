// nuclearDrop.js
// Big screen flash + shake with a white hot explosion ring

export function runNuclearDrop(ctx, options = {}) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  let radius = 0;
  const maxRadius = options.maxRadius || 400;
  const pulseColor = options.color || "rgba(255, 255, 255, 0.6)";
  let flashAlpha = 1.0;
  let tick = 0;

  function animate() {
    // Darken canvas slightly each frame
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Full-screen flash at start
    if (tick < 10) {
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      flashAlpha *= 0.8;
    }

    // Expanding nuclear ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = pulseColor;
    ctx.lineWidth = 12;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.stroke();

    radius += 10;
    tick++;

    if (radius < maxRadius) {
      requestAnimationFrame(animate);
    } else {
      ctx.shadowBlur = 0;
    }
  }

  animate();
}
