// fireball.js
// A basic red projectile effect launched from the bottom center

export function runFireball(ctx, options = {}) {
  const x = ctx.canvas.width / 2;
  let y = ctx.canvas.height - 80;
  const radius = options.radius || 12;
  const speed = options.speed || 5;
  const color = options.color || "red";

  function animate() {
    // Fade background
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw fireball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Update position
    y -= speed;

    // Stop when out of view
    if (y > -radius) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
