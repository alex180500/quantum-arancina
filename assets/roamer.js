// resources/roamer.js
window.addEventListener("load", () => {
  const img = document.getElementById("roamer");
  // select your nav bar/header
  const nav = document.querySelector("nav") || document.querySelector("header");
  let navBottom = nav ? nav.getBoundingClientRect().bottom : 0;

  // Random start direction
  const angle      = Math.random() * 2 * Math.PI;
  let dx           = Math.cos(angle);
  let dy           = Math.sin(angle);
  const speed      = 100;      // px/sec
  let rotation     = 0;        // degrees
  const angularSpeed = 90;     // deg/sec

  // Pick a random initial pos once image dimensions are known
  let x, y;
  function resetPosition() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w  = img.clientWidth;
    const h  = img.clientHeight;
    x = Math.random() * (vw - w);
    y = Math.random() * (vh - h);
  }
  resetPosition();

  function step(ts) {
    if (!step.last) step.last = ts;
    const dt = (ts - step.last) / 1000;
    step.last = ts;

    // Move
    x += dx * speed * dt;
    y += dy * speed * dt;

    // Recompute bounds each frame
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w  = img.clientWidth;
    const h  = img.clientHeight;

    // Bounce left/right
    if (x <= 0) {
      x = 0;
      dx *= -1;
    } else if (x >= vw - w) {
      x = vw - w;
      dx *= -1;
    }

    // Bounce off navbar
    if (y <= navBottom) {
      y = navBottom;
      dy *= -1;
    }
    // Bounce bottom
    else if (y >= vh - h) {
      y = vh - h;
      dy *= -1;
    }

    // Rotate
    rotation = (rotation + angularSpeed * dt) % 360;

    img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    requestAnimationFrame(step);
  }

  // On resize or orientation change, recalc navbar line
  function recalcNav() {
    navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
  }
  window.addEventListener("resize",  recalcNav);
  window.addEventListener("orientationchange", recalcNav);

  requestAnimationFrame(step);
});
