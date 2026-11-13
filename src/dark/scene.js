import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Hero scene: a gold ring with a faceted gem, floating gold dust.
export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  const isMobile = window.matchMedia('(max-width: 800px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.6 : 1.9));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 8);

  const gold = new THREE.MeshStandardMaterial({ color: 0xe0a93f, metalness: 1, roughness: 0.2, envMapIntensity: 1.5 });
  const goldDark = new THREE.MeshStandardMaterial({ color: 0xb98728, metalness: 1, roughness: 0.32, envMapIntensity: 1.2 });
  const stone = new THREE.MeshStandardMaterial({
    color: 0xcfe9ff, metalness: 0.95, roughness: 0.04, envMapIntensity: 2.6, flatShading: true,
  });

  const rig = new THREE.Group();
  const spin = new THREE.Group();
  rig.add(spin);
  scene.add(rig);

  // band
  const band = new THREE.Mesh(new THREE.TorusGeometry(1, 0.17, 56, 180), gold);
  spin.add(band);

  // inner ridge for depth
  const ridge = new THREE.Mesh(new THREE.TorusGeometry(1, 0.1, 32, 160), goldDark);
  ridge.scale.set(1, 1, 1.35);
  spin.add(ridge);

  // gem (brilliant-ish cut via lathe)
  const profile = [
    [0, -0.95], [0.46, -0.28], [0.9, 0.12], [0.9, 0.2], [0.58, 0.52], [0.48, 0.52], [0, 0.52],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const gemGeo = new THREE.LatheGeometry(profile, 10);
  const gemGroup = new THREE.Group();
  const gem = new THREE.Mesh(gemGeo, stone);
  gem.scale.setScalar(0.5);
  gem.position.y = 0.0;
  gemGroup.add(gem);
  // setting cup + prongs
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.2, 0.3, 10), gold);
  cup.position.y = -0.34;
  gemGroup.add(cup);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.36, 8), gold);
    prong.position.set(Math.cos(a) * 0.43, 0.02, Math.sin(a) * 0.43);
    gemGroup.add(prong);
  }
  gemGroup.position.y = 1.55;
  spin.add(gemGroup);

  // side stones
  [-1, 1].forEach((s) => {
    const a = Math.PI / 2 + s * 0.42;
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), stone);
    m.position.set(Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0.0);
    m.scale.set(1, 1.2, 1);
    spin.add(m);
  });

  // lights
  const key = new THREE.DirectionalLight(0xffe2a8, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0xffc766, 14, 14);
  rim.position.set(-3, -1, 3);
  scene.add(rim);

  // gold dust
  const N = isMobile ? 240 : 520;
  const pos = new Float32Array(N * 3);
  const speed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    speed[i] = 0.05 + Math.random() * 0.18;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,236,170,1)');
  grad.addColorStop(0.35, 'rgba(240,190,90,.55)');
  grad.addColorStop(1, 'rgba(240,190,90,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      map: new THREE.CanvasTexture(c), size: isMobile ? 0.16 : 0.13, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.85,
    })
  );
  scene.add(dust);

  // state
  const state = { progress: 0, px: 0, py: 0, tx: 0, ty: 0, active: true };

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const portrait = camera.aspect < 0.9;
    camera.fov = portrait ? 40 : 32;
    camera.updateProjectionMatrix();
    rig.userData.baseY = portrait ? 0.75 : -0.05;
    rig.userData.baseScale = portrait ? 0.74 : 1.15;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', (e) => {
    state.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    state.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  // gyroscope parallax on phones
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    state.tx = Math.max(-1, Math.min(1, e.gamma / 30));
    state.ty = Math.max(-1, Math.min(1, ((e.beta || 45) - 45) / 30));
  });

  const io = new IntersectionObserver(([en]) => (state.active = en.isIntersecting), { threshold: 0 });
  io.observe(canvas);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!state.active || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const p = state.progress;

    state.px += (state.tx - state.px) * 0.06;
    state.py += (state.ty - state.py) * 0.06;

    spin.rotation.y = t * 0.4 + p * Math.PI * 2.2;
    rig.rotation.x = 0.5 + state.py * 0.18 + p * 0.9;
    rig.rotation.z = state.px * 0.12 - p * 0.3;
    rig.position.y = rig.userData.baseY + Math.sin(t * 0.9) * 0.06 + p * 1.1;
    rig.position.x = state.px * 0.15;
    rig.scale.setScalar(rig.userData.baseScale * (1 - p * 0.45));
    gemGroup.position.y = 1.55 + p * 0.9;

    rim.position.x = -3 + Math.sin(t * 0.6) * 2;
    rim.position.y = -1 + Math.cos(t * 0.5) * 1.5;

    const a = dustGeo.attributes.position;
    for (let i = 0; i < N; i++) {
      let y = a.array[i * 3 + 1] + speed[i] * dt;
      if (y > 4.5) y = -4.5;
      a.array[i * 3 + 1] = y;
    }
    a.needsUpdate = true;
    dust.rotation.y = t * 0.02 + state.px * 0.1;
    dust.position.y = p * -0.8;

    renderer.render(scene, camera);
  }
  frame();

  return {
    setProgress(p) {
      state.progress = p;
    },
  };
}
