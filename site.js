// ===== EDIT THIS PART =====
const CONFIG = {
  company: "Your Company",
  tagline: "A short line about what you do.",
  about: "Write two sentences here about your company, who it serves and why it exists.",
  email: "hello@yourcompany.com",
  services: [
    { title: "What we make", text: "Describe your first product or service." },
    { title: "Who we help", text: "Describe the customers you work with." },
    { title: "How we work", text: "Describe what makes your approach different." }
  ],
  // Put the 4 photos in an "images" folder next to these files.
  owners: [
    { name: "Owner One",   role: "Co-owner", photo: "images/owner1.jpg", bio: "A short line about this owner." },
    { name: "Owner Two",   role: "Co-owner", photo: "images/owner2.jpg", bio: "A short line about this owner." },
    { name: "Owner Three", role: "Co-owner", photo: "images/owner3.jpg", bio: "A short line about this owner." },
    { name: "Owner Four",  role: "Co-owner", photo: "images/owner4.jpg", bio: "A short line about this owner." }
  ]
};
// ===== END EDIT =====

const here = location.pathname.endsWith("ownership.html") ? "own" : "home";
document.title = here === "own" ? "Ownership | " + CONFIG.company : CONFIG.company;
document.querySelector("nav").innerHTML =
  `<a class="logo" href="index.html">★ ${CONFIG.company}</a><ul>
   <li><a href="index.html" class="${here === "home" ? "on" : ""}">Home</a></li>
   <li><a href="ownership.html" class="${here === "own" ? "on" : ""}">Ownership</a></li></ul>`;
document.querySelector("footer").innerHTML =
  `© ${new Date().getFullYear()} ${CONFIG.company} · <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;

// Flying stars
(function () {
  const c = document.getElementById("stars"), x = c.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, stars = [], shots = [], last = performance.now();
  function size() {
    const d = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    stars = Array.from({ length: Math.min(170, Math.round(W * H / 9000)) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + .6,
      a: Math.random() * 6.283, s: Math.random() * 30 + 8, t: Math.random() * 6.283, gold: Math.random() < .35
    }));
  }
  function spark(px, py, r, rot) {
    x.beginPath();
    for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5 - Math.PI / 2, R = i % 2 ? r * .45 : r; x.lineTo(px + Math.cos(a) * R, py + Math.sin(a) * R); }
    x.closePath(); x.fill();
  }
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    x.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.x += Math.cos(s.a) * s.s * dt; s.y += Math.sin(s.a) * s.s * dt;
      s.a += Math.sin(now / 3000 + s.t) * .2 * dt; s.t += dt * 2;
      s.x = (s.x + W + 20) % (W + 20) ; s.y = (s.y + H + 20) % (H + 20);
      x.globalAlpha = .45 + .55 * Math.abs(Math.sin(s.t));
      x.fillStyle = s.gold ? "#ffcf5c" : "#fff";
      if (s.gold) spark(s.x, s.y, s.r * 2.5, s.t * .3); else { x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill(); }
    }
    if (Math.random() < dt * .5) shots.push({ x: W * (.3 + Math.random() * .8), y: -10, vx: -(300 + Math.random() * 250), vy: 300 + Math.random() * 200, l: 1 });
    x.strokeStyle = "#fff"; x.lineWidth = 2;
    shots = shots.filter(p => p.l > 0 && p.y < H + 20);
    for (const p of shots) {
      p.x += p.vx * dt; p.y += p.vy * dt; p.l -= dt * .8; x.globalAlpha = p.l;
      x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(p.x - p.vx * .09, p.y - p.vy * .09); x.stroke();
    }
    x.globalAlpha = 1;
    if (!still) requestAnimationFrame(frame);
  }
  addEventListener("resize", () => { size(); if (still) frame(last); });
  size(); frame(last);
})();
