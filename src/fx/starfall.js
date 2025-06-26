// starfall.js
// Animated stars falling diagonally like a meteor shower

export function runStarfall(ctx, options = {}) {
  const stars = [];
  const numStars = options.count || 20;
  const emoji = options.emoji || "⭐";

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * ctx.canvas.width,
      y: -Math.random() * ctx.canvas.height,
      speed: 2 + Math.random() * 4,
      size: 20 + Math.random() * 10
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let star of stars) {
      star.x += 1;
      star.y += star.speed;

      ctx.font = `${star.size}px Arial`;
      ctx.fillStyle = "white";
      ctx.fillText(emoji, star.x, star.y);

      if (star.y > ctx.canvas.height) {
        star.y = -20;
        star.x = Math.random() * ctx.canvas.width;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
