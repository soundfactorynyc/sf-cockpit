// currencyBeam.js
// Shoots a green currency beam from bottom to top, triggered on tip

export function runCurrencyBeam(ctx, options = {}) {
  const x = ctx.canvas.width / 2;
  let y = ctx.canvas.height - 80;
  const width = 12;
  const height = 60;
  const speed = options.speed || 8;
  const emoji = options.emoji || "💸";
  const color = options.color || "#00ff66";
  let tick = 0;

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw beam
    ctx.beginPath();
    ctx.rect(x - width / 2, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();

    // Animate emoji particles
    ctx.font = "24px Arial";
    ctx.fillStyle = "#00ff66";
    ctx.textAlign = "center";
    ctx.fillText(emoji, x, y + tick % 60);

    y -= speed;
    tick++;

    if (y > -height) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
