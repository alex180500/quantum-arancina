document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("roamer");
  // detect your nav—change selector if needed
  const nav = document.querySelector("nav") || document.querySelector("header");
  let navBottom = nav ? nav.getBoundingClientRect().bottom : 0;

  let vw = window.innerWidth,
      vh = window.innerHeight;

  // Initial position & vector
  let x = Math.random() * (vw - img.clientWidth),
      y = Math.random() * (vh - img.clientHeight);
  const angle = Math.random() * 2 * Math.PI;
  let dx = Math.cos(angle),
      dy = Math.sin(angle);
  const speed = 100;        // px/sec

  // Rotation
  let rotation       = 0;    // degrees
  const angularSpeed = 90;   // deg/sec

  function step(timestamp) {
    if (!step.last) step.last = timestamp;
    const dt = (timestamp - step.last) / 1000;
    step.last = timestamp;

    // Move
    x += dx * speed * dt;
    y += dy * speed * dt;

    // Bounce off left/right
    if (x <= 0) {
      x = 0;
      dx *= -1;
    }
    if (x >= vw - img.clientWidth) {
      x = vw - img.clientWidth;
      dx *= -1;
    }

    // Bounce off navbar top
    if (y <= navBottom) {
      y = navBottom;
      dy *= -1;
    }
    // Bounce off bottom
    if (y >= vh - img.clientHeight) {
      y = vh - img.clientHeight;
      dy *= -1;
    }

    // Rotate
    rotation = (rotation + angularSpeed * dt) % 360;

    // Apply
    img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    requestAnimationFrame(step);
  }

  // Recalculate dimensions (viewport & nav) on resize
  window.addEventListener("resize", () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    navBottom = nav
      ? nav.getBoundingClientRect().bottom
      : 0;
  });

  requestAnimationFrame(step);
});
