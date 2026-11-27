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

const CSS = `
:root{--night:#0a1030;--deep:#17275e;--ink:#f1f3ff;--mute:#a8b3de;--gold:#ffcf5c;--serif:"Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif}
*{box-sizing:border-box;margin:0}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);line-height:1.6;min-height:100vh;overflow-x:hidden;
background:radial-gradient(1100px 650px at 75% -10%,var(--deep),transparent 65%),var(--night);background-attachment:fixed}
#stars{position:fixed;left:0;top:0;width:100%;height:100%;z-index:0;pointer-events:none}
header{position:sticky;top:0;z-index:10;background:rgba(10,16,48,.72);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid #ffffff1a}
main,footer{position:relative;z-index:1}
nav{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 6vw}
.logo{font:700 1.35rem var(--serif);color:var(--ink);text-decoration:none}
nav ul{display:flex;gap:26px;list-style:none;padding:0}
nav a:not(.logo){color:var(--mute);text-decoration:none;font-weight:600;padding:4px 0;border-bottom:2px solid transparent}
nav a:not(.logo):hover,nav a.on{color:var(--ink);border-color:var(--gold)}
a:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
.hero{min-height:68vh;display:grid;place-content:center;gap:20px;padding:60px 6vw}
.hero h1{font:700 clamp(2.6rem,8vw,5.6rem)/1.02 var(--serif);max-width:12ch}
.hero p{max-width:52ch;color:var(--mute);font-size:1.15rem}
.cta{display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-block;padding:13px 26px;border-radius:999px;background:var(--gold);color:#1b1500;font-weight:700;text-decoration:none}
.btn.ghost{background:none;color:var(--ink);border:1px solid #ffffff55}
.list{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:36px;padding:10px 6vw 80px;max-width:1100px}
.list div{border-top:2px solid var(--gold);padding-top:14px}
.list h3{font:700 1.3rem var(--serif);margin-bottom:6px}
.list p{color:var(--mute)}
footer{padding:28px 6vw;color:var(--mute);border-top:1px solid #ffffff1a}
footer a{color:var(--gold)}
.title{padding:34px 6vw 0}
.title h1{font:700 clamp(2.2rem,6vw,3.6rem)/1.1 var(--serif)}
.title p{color:var(--mute);margin-top:6px}
.flip{perspective:900px;width:210px;height:290px}
.inner{position:relative;width:100%;height:100%;transition:transform .6s;transform-style:preserve-3d}
.flip.on .inner{transform:rotateY(180deg)}
.face{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:16px;-webkit-backface-visibility:hidden;backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;padding:20px 16px;text-align:center;background:linear-gradient(160deg,#fff,#dde4ff);color:#12183a;box-shadow:0 18px 40px #000a}
.face.back{transform:rotateY(180deg);justify-content:center;background:linear-gradient(160deg,#1f2f6b,#0f1a3d);color:var(--ink)}
.hole{width:46px;height:7px;border-radius:4px;background:#0a1030;margin-bottom:14px}
.photo{width:110px;height:110px;border-radius:50%;object-fit:cover;border:4px solid var(--gold);background:#c8d2ff;display:grid;place-items:center;font:700 2rem var(--serif);color:#34429a}
.face h2{margin-top:14px;font:700 1.3rem var(--serif)}
.role{color:#3f50bd;font-weight:700;font-size:.92rem}
.co{margin-top:auto;font-size:.8rem;color:#6a76b3}
.back p{color:#d0d8ff}
.clip{width:34px;height:26px;border-radius:6px 6px 14px 14px;background:linear-gradient(#eef1ff,#8f9ac4)}
@media(max-width:560px){nav{flex-direction:column}}
`;
const st = document.createElement("style");
st.textContent = CSS;
document.head.appendChild(st);

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
