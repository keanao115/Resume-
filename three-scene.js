/**
 * 3D IT Command Station & Cyber Security Portal
 * Built for Waiman Ao - Information Technology Portfolio
 * 
 * Accurately modeled after the reference photo (ales-nesetril-Im7lZjxeLhg-unsplash.jpg):
 * - Stage 1: MacBook Pro unibody, sunset horizon screen, dual-color light spill onto keyboard & desk
 * - Stage 2: Smooth dive-in zoom into screen -> Fullscreen 3D Dynamic Code Matrix
 * - Stage 3: Apple Maps-Style High-Fidelity 3D Cyber Threat Intelligence Globe
 *            • Photorealistic Earth continents, oceanic specular sheen, city night lights
 *            • Realistic Apple Maps atmospheric limb/Fresnel glow (cyan/azure halo)
 *            • Honolulu, HI Central Sec-Ops Beacon (Lat 21.3°N, Lon 157.8°W)
 *            • 3D Ballistic Cyber Arcs connecting global hubs (Tokyo, Silicon Valley, NYC, London, Sydney)
 *            • Real-time threat packets (Warning Orange intercepted & purified to Cyan/Green)
 *            • Orbital latitude/longitude graticule rings & Holographic Threat SOC HUD
 */

(function () {
  'use strict';

  let scene, camera, renderer;
  let canvasContainer;
  let currentTheme = 'dark';

  // Global Scene Groups
  let stage1LaptopGroup, lidPivot, screenMesh, screenTexture, screenCanvas, screenCtx;
  let screenOrangeLight, screenCyanLight;
  let stage2CodeGroup, codePlanes = [], matrixParticles;
  let stage3GlobeGroup, earthMesh, atmosphereMesh, cloudMesh;
  let cyberArcs = [], arcPackets = [], honoluluBeacon, orbitalRing, globeHudMesh;

  // Interpolation targets
  let targetScroll = 0;
  let smoothScroll = 0;
  let targetMouse = { x: 0, y: 0 };
  let smoothMouse = { x: 0, y: 0 };
  let currentSectionIndex = 0;

  // Materials dictionary
  let materials = {};

  /* -------------------------------------------------------------
     1. SCREEN TEXTURE: SUNSET TWILIGHT HORIZON + LIVE CLI
     ------------------------------------------------------------- */
  function initTerminalCanvas() {
    screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    screenCtx = screenCanvas.getContext('2d');
    screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    renderSunsetTerminal();
  }

  function renderSunsetTerminal() {
    if (!screenCtx) return;
    const ctx = screenCtx;
    const w = screenCanvas.width;
    const h = screenCanvas.height;

    // Twilight to Sunset Sky Gradient (Matching photo)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0.0, '#032544');
    skyGrad.addColorStop(0.25, '#006c8a');
    skyGrad.addColorStop(0.48, '#1ad6cb');
    skyGrad.addColorStop(0.60, '#ffbe53');
    skyGrad.addColorStop(0.72, '#ff4800');
    skyGrad.addColorStop(0.88, '#c91414');
    skyGrad.addColorStop(1.0, '#2d0408');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Silhouetted Mountain Ridge
    ctx.fillStyle = '#100305';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.74);
    ctx.lineTo(w * 0.15, h * 0.71);
    ctx.lineTo(w * 0.32, h * 0.73);
    ctx.lineTo(w * 0.50, h * 0.69);
    ctx.lineTo(w * 0.68, h * 0.72);
    ctx.lineTo(w * 0.85, h * 0.70);
    ctx.lineTo(w, h * 0.73);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Subtle Cyber Scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }

    // Frosted Window Header Bar
    ctx.fillStyle = 'rgba(10, 15, 25, 0.45)';
    ctx.fillRect(0, 0, w, 44);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 44);
    ctx.lineTo(w, 44);
    ctx.stroke();

    const dots = [
      { x: 28, color: '#ff5f56' },
      { x: 50, color: '#ffbd2e' },
      { x: 72, color: '#27c93f' }
    ];
    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, 22, 6, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    });

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 15px -apple-system, BlinkMacSystemFont, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('waiman@security-station:~ (zsh)', w / 2, 28);
    ctx.textAlign = 'left';

    ctx.font = 'bold 16px "SF Mono", "Fira Code", monospace';
    const renderLine = (text, color, y) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillText(text, 33, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(text, 32, y);
    };

    let startY = 82;
    const sp = 29;

    renderLine('waiman@security:~$ whoami', '#ffffff', startY);
    renderLine('> Waiman Ao | Cybersecurity & AI Solutions Engineer', '#66e0ff', startY + sp);
    renderLine('waiman@security:~$ cat competencies.json', '#ffffff', startY + sp * 2.3);
    renderLine('• Security    : Vulnerability Assessment & Defensive Engineering', '#30d158', startY + sp * 3.3);
    renderLine('• AI Systems  : Autonomous AI Agent Programming & Full-Stack', '#ffd166', startY + sp * 4.3);
    renderLine('• GitHub/Apps : github.com/keanao115 | ERMS Cloud', '#ff7733', startY + sp * 5.3);
    renderLine('• Location    : Honolulu, HI | US Work Authorized', '#ffffff', startY + sp * 6.3);
    renderLine('waiman@security:~$ scroll_down --dive-into-screen', '#ffffff', startY + sp * 7.7);
    renderLine('[✓] Threat Defense & AI Agents Active. Dive Initiated...', '#30d158', startY + sp * 8.7);

    ctx.fillStyle = '#66e0ff';
    ctx.fillRect(495, startY + sp * 7.7 - 14, 10, 18);

    if (screenTexture) screenTexture.needsUpdate = true;
  }

  /* -------------------------------------------------------------
     2. STAGE 1: ACCURATE MACBOOK PRO MODEL
     ------------------------------------------------------------- */
  function createStage1MacBook() {
    stage1LaptopGroup = new THREE.Group();

    materials.laptopBody = new THREE.MeshStandardMaterial({
      color: currentTheme === 'dark' ? 0x1e2026 : 0xd8dde6,
      metalness: currentTheme === 'dark' ? 0.94 : 0.92,
      roughness: currentTheme === 'dark' ? 0.22 : 0.16,
      transparent: true,
      opacity: 1.0
    });

    materials.darkTrim = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      roughness: 0.4,
      metalness: 0.2,
      transparent: true,
      opacity: 1.0
    });

    materials.trackpad = new THREE.MeshStandardMaterial({
      color: currentTheme === 'dark' ? 0x25272e : 0xc6cbd3,
      roughness: 0.28,
      metalness: 0.6,
      transparent: true,
      opacity: 1.0
    });

    materials.keys = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      emissive: 0x4a1805,
      emissiveIntensity: 0.45,
      roughness: 0.5,
      metalness: 0.15,
      transparent: true,
      opacity: 1.0
    });

    materials.screen = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: 1.0
    });

    // Laptop Base
    const baseW = 3.4, baseH = 0.11, baseD = 2.3;
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(baseW, baseH, baseD), materials.laptopBody);
    stage1LaptopGroup.add(baseMesh);

    // Front Opening Thumb Groove Notch
    const notchGeo = new THREE.BoxGeometry(0.55, 0.035, 0.04);
    const notchMesh = new THREE.Mesh(notchGeo, materials.darkTrim);
    notchMesh.position.set(0, baseH / 2 - 0.01, baseD / 2 - 0.015);
    stage1LaptopGroup.add(notchMesh);

    // Trackpad
    const tpMesh = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.012, 0.88), materials.trackpad);
    tpMesh.position.set(0, baseH / 2 + 0.005, 0.54);
    stage1LaptopGroup.add(tpMesh);

    // Keyboard Recess & Chiclet Keys
    const kbRecess = new THREE.Mesh(new THREE.BoxGeometry(2.92, 0.012, 1.18), materials.darkTrim);
    kbRecess.position.set(0, baseH / 2 + 0.003, -0.42);
    stage1LaptopGroup.add(kbRecess);

    const keyGeo = new THREE.BoxGeometry(0.18, 0.02, 0.16);
    const keysGrp = new THREE.Group();
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 13; c++) {
        if (r === 4 && c >= 4 && c <= 8) continue;
        const key = new THREE.Mesh(keyGeo, materials.keys);
        key.position.set((c - 6) * 0.21, baseH / 2 + 0.015, (r - 2) * 0.21 - 0.42);
        keysGrp.add(key);
      }
    }
    const spacebar = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.02, 0.16), materials.keys);
    spacebar.position.set(0, baseH / 2 + 0.015, 2 * 0.21 - 0.42);
    keysGrp.add(spacebar);
    stage1LaptopGroup.add(keysGrp);

    // Screen Lid & Hinge
    lidPivot = new THREE.Group();
    lidPivot.position.set(0, baseH / 2, -baseD / 2 + 0.04);

    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 3.2, 16).rotateZ(Math.PI / 2),
      materials.darkTrim
    );
    lidPivot.add(hinge);

    const lidH = 2.25, lidThick = 0.065;
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(baseW, lidH, lidThick), materials.laptopBody);
    lidMesh.position.set(0, lidH / 2, 0);
    lidPivot.add(lidMesh);

    // Apple Logo on Back
    const emblemMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.18, 32), emblemMat);
    emblem.rotation.y = Math.PI;
    emblem.position.set(0, lidH / 2, -lidThick / 2 - 0.003);
    lidPivot.add(emblem);

    // Bezel
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(baseW - 0.06, lidH - 0.06, 0.005), materials.darkTrim);
    bezel.position.set(0, lidH / 2, lidThick / 2 + 0.002);
    lidPivot.add(bezel);

    // Screen Display Plane (Facing Viewer)
    screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(baseW - 0.28, lidH - 0.28), materials.screen);
    screenMesh.position.set(0, lidH / 2 + 0.02, lidThick / 2 + 0.008);
    lidPivot.add(screenMesh);

    stage1LaptopGroup.add(lidPivot);

    // Photo Reference Angles
    lidPivot.rotation.x = THREE.MathUtils.degToRad(50);
    stage1LaptopGroup.position.set(0.1, -0.42, 0.2);
    stage1LaptopGroup.rotation.set(0.28, -0.48, 0.06);

    scene.add(stage1LaptopGroup);

    // Screen Light Spill
    screenOrangeLight = new THREE.PointLight(0xff5522, 3.5, 5.0);
    screenOrangeLight.position.set(0.2, 0.1, -0.4);
    stage1LaptopGroup.add(screenOrangeLight);

    screenCyanLight = new THREE.PointLight(0x00d4ff, 2.5, 6.0);
    screenCyanLight.position.set(-1.2, 0.8, 0.2);
    stage1LaptopGroup.add(screenCyanLight);
  }

  /* -------------------------------------------------------------
     4. STAGE 2: 3D DYNAMIC CODE MATRIX (ABOUT ME)
     ------------------------------------------------------------- */
  function createCodeBlockTexture(variant) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(10, 14, 24, 0.88)';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = variant === 0 ? 'rgba(168, 85, 247, 0.5)' : (variant === 1 ? 'rgba(41, 151, 255, 0.5)' : 'rgba(255, 107, 0, 0.5)');
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 508, 252);

    ctx.font = '14px "SF Mono", monospace';
    let lines = [];

    if (variant === 0) {
      lines = [
        { t: 'const crypto = require("crypto");', c: '#a855f7' },
        { t: 'function verifyHandshake(token, cert) {', c: '#ffffff' },
        { t: '  const cipher = crypto.createDecipheriv("aes-256-gcm");', c: '#30d158' },
        { t: '  if (!cert.verifyAuthority("HONOLULU_UH_CA")) {', c: '#ff6b00' },
        { t: '    throw new SecurityException("UNAUTHORIZED_ACCESS");', c: '#ff4d4d' },
        { t: '  }', c: '#ffffff' },
        { t: '  return cipher.update(token) + cipher.final();', c: '#2997ff' },
        { t: '}', c: '#ffffff' }
      ];
    } else if (variant === 1) {
      lines = [
        { t: '# /etc/security/firewall-rules.sh', c: '#2997ff' },
        { t: 'iptables -A INPUT -p tcp --dport 22 -m state --state NEW', c: '#30d158' },
        { t: 'iptables -A INPUT -p tcp --dport 443 -j ACCEPT', c: '#30d158' },
        { t: 'sysctl -w net.ipv4.tcp_syncookies=1', c: '#a855f7' },
        { t: 'echo "[STATUS] Defense Perimeter Active @ Hawaii"', c: '#2997ff' },
        { t: 'auditd --enforce-kernel-selinux=1', c: '#ffffff' }
      ];
    } else {
      lines = [
        { t: '>>> INCOMING THREAT DETECTION LOG', c: '#ff6b00' },
        { t: '[ALERT] SYN_FLOOD detected on port 8080', c: '#ff4d4d' },
        { t: '[ANALYSIS] Source IP: 198.51.100.24 (MALICIOUS)', c: '#ff6b00' },
        { t: '[RESPONSE] Routing to HoneyPot Sandbox', c: '#a855f7' },
        { t: '[FIREWALL] Packet drop latency: 0.14ms [DEFLECTED]', c: '#30d158' },
        { t: '[INTEGRITY] Zero-Trust Core: 100% SECURE', c: '#2997ff' }
      ];
    }

    lines.forEach((l, i) => {
      ctx.fillStyle = l.c;
      ctx.fillText(l.t, 20, 36 + i * 28);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    return tex;
  }

  function createStage2CodeSpace() {
    stage2CodeGroup = new THREE.Group();
    stage2CodeGroup.visible = false;

    const cardGeo = new THREE.PlaneGeometry(2.4, 1.2);
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: createCodeBlockTexture(i % 3),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      const angle = (i / 18) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 1.8;
      const zPos = -8 + (i / 18) * 12;

      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8,
        Math.sin(angle) * (radius * 0.7) + (Math.random() - 0.5) * 0.6,
        zPos
      );

      mesh.userData = {
        origPos: mesh.position.clone(),
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        speedZ: 0.012 + Math.random() * 0.02
      };

      codePlanes.push(mesh);
      stage2CodeGroup.add(mesh);
    }

    const count = 300;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      if (Math.random() > 0.4) {
        colors[i * 3] = 0.66; colors[i * 3 + 1] = 0.33; colors[i * 3 + 2] = 0.97;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.42; colors[i * 3 + 2] = 0.0;
      }
    }

    const mGeo = new THREE.BufferGeometry();
    mGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    mGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    matrixParticles = new THREE.Points(mGeo, new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0
    }));
    stage2CodeGroup.add(matrixParticles);

    scene.add(stage2CodeGroup);
  }

  /* -------------------------------------------------------------
     5. STAGE 3: APPLE MAPS-STYLE 3D CYBER THREAT GLOBE
     ------------------------------------------------------------- */
  // Convert Geographic Latitude & Longitude to 3D Sphere Coordinates
  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  }

  // Procedural High-Fidelity Earth Map Texture (Continents, Coastlines, Night Lights)
  function createAppleEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Deep Ocean (Apple Maps dark sapphire gradient)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#020917');
    oceanGrad.addColorStop(0.5, '#051430');
    oceanGrad.addColorStop(1, '#020917');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // 2. Graticule (Subtle latitude & longitude grid)
    ctx.strokeStyle = 'rgba(41, 151, 255, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 170.6) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 85.3) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
    }

    // 3. Realistic Continents & Landmasses
    ctx.fillStyle = '#0f261e'; // Satellite forest & terrain base
    ctx.strokeStyle = '#266657'; // Coastline glow
    ctx.lineWidth = 2;

    const drawLand = (points) => {
      ctx.beginPath();
      points.forEach((pt, i) => {
        const px = (pt[0] / 360 + 0.5) * 2048;
        const py = (0.5 - pt[1] / 180) * 1024;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // North America
    drawLand([
      [-168, 66], [-140, 70], [-100, 72], [-65, 62], [-55, 48],
      [-75, 38], [-80, 25], [-82, 30], [-97, 26], [-105, 20],
      [-90, 14], [-84, 9], [-78, 8], [-82, 14], [-105, 28],
      [-122, 37], [-125, 49], [-136, 58], [-160, 56], [-168, 66]
    ]);

    // South America
    drawLand([
      [-80, 10], [-60, 12], [-35, -5], [-38, -18], [-55, -28],
      [-65, -45], [-72, -54], [-75, -42], [-81, -5], [-80, 10]
    ]);

    // Europe & Asia (Eurasia)
    drawLand([
      [-9, 36], [0, 44], [10, 54], [25, 71], [60, 75],
      [100, 78], [140, 74], [170, 68], [142, 50], [130, 32],
      [120, 22], [108, 12], [100, 5], [90, 22], [80, 8],
      [70, 24], [50, 26], [35, 32], [28, 41], [15, 40],
      [-5, 36], [-9, 36]
    ]);

    // Africa
    drawLand([
      [-17, 32], [10, 37], [32, 32], [44, 12], [51, 10],
      [40, -10], [30, -32], [18, -35], [12, -15], [0, 5],
      [-15, 12], [-17, 32]
    ]);

    // Australia
    drawLand([
      [114, -22], [128, -14], [142, -11], [153, -28], [150, -37],
      [138, -38], [116, -34], [114, -22]
    ]);

    // Japan Archipelago
    drawLand([[130, 32], [136, 35], [141, 43], [142, 38], [132, 30]]);

    // 4. City Night Lights (Clusters of golden & cyan light in economic centers)
    const addCityCluster = (lon, lat, count, radius) => {
      const cx = (lon / 360 + 0.5) * 2048;
      const cy = (0.5 - lat / 180) * 1024;
      for (let i = 0; i < count; i++) {
        const ox = (Math.random() - 0.5) * radius;
        const oy = (Math.random() - 0.5) * radius;
        ctx.fillStyle = Math.random() > 0.3 ? '#ffdf7a' : '#5ce1e6';
        ctx.fillRect(cx + ox, cy + oy, Math.random() > 0.5 ? 2 : 1.5, Math.random() > 0.5 ? 2 : 1.5);
      }
    };

    // Major Metropolises
    addCityCluster(-122.4, 37.7, 45, 14); // Silicon Valley
    addCityCluster(-74.0, 40.7, 50, 16);   // NYC / East Coast
    addCityCluster(-0.1, 51.5, 40, 14);    // London
    addCityCluster(8.6, 50.1, 35, 12);     // Frankfurt
    addCityCluster(139.6, 35.6, 55, 16);   // Tokyo
    addCityCluster(103.8, 1.3, 30, 10);    // Singapore
    addCityCluster(151.2, -33.8, 30, 12);  // Sydney
    addCityCluster(-157.8, 21.3, 25, 8);   // Honolulu, HI (Hawaii)

    const tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    return tex;
  }

  // Holographic SOC Threat Intelligence HUD Panel
  function createGlobeHudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(5, 12, 28, 0.88)';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = '#2997ff';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(4, 4, 504, 248);

    ctx.fillStyle = '#2997ff';
    ctx.fillRect(4, 4, 16, 16);
    ctx.fillRect(492, 4, 16, 16);
    ctx.fillRect(4, 236, 16, 16);
    ctx.fillRect(492, 236, 16, 16);

    ctx.font = 'bold 16px "SF Mono", monospace';
    ctx.fillStyle = '#2997ff';
    ctx.fillText('GLOBAL THREAT INTELLIGENCE (SOC)', 28, 42);

    ctx.font = '13px "SF Mono", monospace';
    ctx.fillStyle = '#30d158';
    ctx.fillText('CORE HUB     : HONOLULU, HI [UH WEST OʻAHU]', 28, 80);

    ctx.fillStyle = '#ff6b00';
    ctx.fillText('THREAT DETECT: REAL-TIME PACKET INTERCEPT', 28, 115);

    ctx.fillStyle = '#ffffff';
    ctx.fillText('ENDPOINTS    : 2,840,192 MONITORED [ACTIVE]', 28, 150);

    ctx.fillStyle = '#38d9e6';
    ctx.fillText('DEFENSE GRID : ZERO-TRUST PERIMETER 100%', 28, 185);

    ctx.fillStyle = '#ffd166';
    ctx.fillText('MITIGATION   : 0.12ms LATENCY [DEFLECTED]', 28, 220);

    return new THREE.CanvasTexture(canvas);
  }

  // 3D Parabolic Ballistic Cyber Arc Generator
  function createCyberArc(vA, vB, maxAltitude, colorHex) {
    const mid = vA.clone().add(vB).multiplyScalar(0.5);
    const dist = vA.distanceTo(vB);
    mid.normalize().multiplyScalar(vA.length() + Math.max(dist * 0.35, maxAltitude));

    const curve = new THREE.QuadraticBezierCurve3(vA, mid, vB);
    const points = curve.getPoints(45);
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    const mat = new THREE.LineBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(geo, mat);
    return { curve, line };
  }

  function createStage3CyberGlobe() {
    stage3GlobeGroup = new THREE.Group();
    stage3GlobeGroup.visible = false;
    const R = 2.2;

    // 1. Apple Earth Sphere Body
    const earthGeo = new THREE.SphereGeometry(R, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: createAppleEarthTexture(),
      roughness: 0.45,
      metalness: 0.25,
      transparent: true,
      opacity: 0
    });
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
    stage3GlobeGroup.add(earthMesh);

    // 2. Realistic Apple Maps Atmospheric Limb Glow (Fresnel Shader)
    const atmosGeo = new THREE.SphereGeometry(R * 1.14, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.22, 0.65, 1.0, 1.0) * intensity * 1.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
    stage3GlobeGroup.add(atmosphereMesh);

    // 3. Orbital Latitude / Coordinate Graticule Ring
    const orbitGeo = new THREE.RingGeometry(R * 1.25, R * 1.27, 64);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x2997ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    orbitalRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitalRing.rotation.x = Math.PI / 2;
    stage3GlobeGroup.add(orbitalRing);

    // 4. Honolulu, HI Central Security Hub Beacon (21.3°N, -157.8°W)
    const honoluluVec = latLonToVector3(21.3, -157.8, R);
    honoluluBeacon = new THREE.Group();
    honoluluBeacon.position.copy(honoluluVec);

    // Vertical Laser Pulse
    const laserGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
    laserGeo.translate(0, 0.3, 0);
    laserGeo.rotateX(Math.PI / 2);
    laserGeo.lookAt(honoluluVec);
    const laserMesh = new THREE.Mesh(laserGeo, new THREE.MeshBasicMaterial({ color: 0x38d9e6 }));
    honoluluBeacon.add(laserMesh);

    // Expanding Surface Radar Pulse Ring
    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.12, 32),
      new THREE.MeshBasicMaterial({ color: 0x30d158, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
    );
    pulseRing.lookAt(honoluluVec);
    honoluluBeacon.add(pulseRing);
    stage3GlobeGroup.add(honoluluBeacon);

    // 5. Global Threat Defense Hubs & Ballistic Arcs
    const globalNodes = [
      { name: 'Silicon Valley', lat: 37.7, lon: -122.4, color: 0x2997ff },
      { name: 'Tokyo', lat: 35.6, lon: 139.6, color: 0xff6b00 },
      { name: 'New York', lat: 40.7, lon: -74.0, color: 0x2997ff },
      { name: 'London', lat: 51.5, lon: -0.1, color: 0xa855f7 },
      { name: 'Frankfurt', lat: 50.1, lon: 8.6, color: 0x2997ff },
      { name: 'Singapore', lat: 1.3, lon: 103.8, color: 0xff6b00 },
      { name: 'Sydney', lat: -33.8, lon: 151.2, color: 0x30d158 }
    ];

    globalNodes.forEach((node, idx) => {
      const nodeVec = latLonToVector3(node.lat, node.lon, R);

      // Node marker
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshBasicMaterial({ color: node.color })
      );
      pin.position.copy(nodeVec);
      stage3GlobeGroup.add(pin);

      // 3D Parabolic Defense Arc to Honolulu
      const arc = createCyberArc(nodeVec, honoluluVec, 0.75, node.color);
      cyberArcs.push(arc);
      stage3GlobeGroup.add(arc.line);

      // Threat Packet traveling along the arc
      const packet = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.06),
        new THREE.MeshBasicMaterial({ color: 0xff6b00 }) // Warning Orange
      );
      packet.userData = {
        curve: arc.curve,
        speed: 0.008 + idx * 0.003,
        offset: idx * 0.15
      };
      arcPackets.push(packet);
      stage3GlobeGroup.add(packet);
    });

    // 6. Holographic Threat Intelligence SOC HUD Plate
    const hudGeo = new THREE.PlaneGeometry(2.5, 1.25);
    const hudMat = new THREE.MeshBasicMaterial({
      map: createGlobeHudTexture(),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    globeHudMesh = new THREE.Mesh(hudGeo, hudMat);
    globeHudMesh.position.set(2.6, -0.4, 0.6);
    globeHudMesh.rotation.y = -0.35;
    stage3GlobeGroup.add(globeHudMesh);

    // Realistic Earth 23.5° Axial Tilt
    stage3GlobeGroup.rotation.z = THREE.MathUtils.degToRad(23.5);
    scene.add(stage3GlobeGroup);
  }

  /* -------------------------------------------------------------
     LIGHTING & THEME
     ------------------------------------------------------------- */
  function setupLighting() {
    materials.ambientLight = new THREE.AmbientLight(0x061226, 1.8);
    scene.add(materials.ambientLight);

    materials.keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    materials.keyLight.position.set(6, 8, 7);
    scene.add(materials.keyLight);

    materials.cyanLight = new THREE.PointLight(0x2997ff, 3.2, 35);
    materials.cyanLight.position.set(0, 2, 5);
    scene.add(materials.cyanLight);

    materials.orangeLight = new THREE.PointLight(0xff6b00, 2.2, 25);
    materials.orangeLight.position.set(-4, -2, 3);
    scene.add(materials.orangeLight);
  }

  window.update3DTheme = function (theme) {
    currentTheme = theme;
    if (!materials.laptopBody) return;

    if (currentTheme === 'dark') {
      // Dark Mode: Apple Space Black Pro Anodized Aluminum
      materials.laptopBody.color.setHex(0x1e2026);
      materials.laptopBody.roughness = 0.22;
      materials.laptopBody.metalness = 0.94;
      materials.trackpad.color.setHex(0x25272e);
      materials.ambientLight.color.setHex(0x0a101d);
      materials.ambientLight.intensity = 1.9;
      materials.keyLight.intensity = 2.2;
    } else {
      // Light Mode: Apple Studio Spotlight & Pure Silver Aluminum
      materials.laptopBody.color.setHex(0xd8dde6);
      materials.laptopBody.roughness = 0.16;
      materials.laptopBody.metalness = 0.92;
      materials.trackpad.color.setHex(0xc6cbd3);
      materials.ambientLight.color.setHex(0xf8fafc);
      materials.ambientLight.intensity = 2.4;
      materials.keyLight.intensity = 2.6;
    }
  };

  /* -------------------------------------------------------------
     INITIALIZATION & EVENTS
     ------------------------------------------------------------- */
  function init() {
    canvasContainer = document.getElementById('webgl-3d-scene');
    if (!canvasContainer) {
      canvasContainer = document.createElement('canvas');
      canvasContainer.id = 'webgl-3d-scene';
      document.body.prepend(canvasContainer);
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.0);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasContainer,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const htmlTheme = document.documentElement.getAttribute('data-theme');
    if (htmlTheme) currentTheme = htmlTheme;

    initTerminalCanvas();
    setupLighting();
    createStage1MacBook();
    createStage2CodeSpace();
    createStage3CyberGlobe();

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    onWindowScroll();
    requestAnimationFrame(animate);
  }

  function onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    targetScroll = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  }

  function onMouseMove(e) {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    targetMouse.x = (e.clientX - halfW) / halfW;
    targetMouse.y = (e.clientY - halfH) / halfH;
  }

  /* -------------------------------------------------------------
     ANIMATION LOOP: MACBOOK -> DIVE-IN -> APPLE CYBER GLOBE
     ------------------------------------------------------------- */
  function animate(timestamp) {
    requestAnimationFrame(animate);

    smoothScroll += (targetScroll - smoothScroll) * 0.075;
    smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
    smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;

    const time = timestamp * 0.001;
    const p = smoothScroll;

    const mTiltX = smoothMouse.y * 0.12;
    const mTiltY = smoothMouse.x * 0.16;

    /* =============================================================
       STAGE 1: HERO (0.0 to 0.38) -> ACCURATE SUNSET MACBOOK PHOTO
       ============================================================= */
    if (p < 0.40) {
      stage1LaptopGroup.visible = true;

      let openP = Math.min(p / 0.16, 1.0);
      let diveP = 0;
      if (p > 0.16) {
        diveP = Math.min((p - 0.16) / 0.18, 1.0);
      }

      const curRotX = THREE.MathUtils.lerp(0.28, 0, diveP);
      const curRotY = THREE.MathUtils.lerp(-0.48, 0, diveP);
      const curRotZ = THREE.MathUtils.lerp(0.06, 0, diveP);

      const curPosX = THREE.MathUtils.lerp(0.1, 0, diveP);
      const curPosY = THREE.MathUtils.lerp(-0.42, 0.1, diveP);
      const curPosZ = THREE.MathUtils.lerp(0.2, 5.6, diveP);

      stage1LaptopGroup.position.set(curPosX, curPosY, curPosZ);
      stage1LaptopGroup.rotation.set(curRotX - mTiltX * (1 - diveP), curRotY + mTiltY * (1 - diveP), curRotZ);

      const lidAngleDeg = THREE.MathUtils.lerp(50, 0, openP);
      lidPivot.rotation.x = THREE.MathUtils.degToRad(lidAngleDeg);

      screenOrangeLight.intensity = 3.2 + Math.sin(time * 3.0) * 0.5;
      screenCyanLight.intensity = 2.2 + Math.cos(time * 2.5) * 0.4;

      let alpha = 1.0;
      if (p > 0.24) {
        alpha = 1.0 - (p - 0.24) / 0.10;
      }
      alpha = Math.min(Math.max(alpha, 0), 1);

      materials.laptopBody.opacity = alpha;
      materials.darkTrim.opacity = alpha;
      materials.trackpad.opacity = alpha;
      materials.keys.opacity = alpha;
      materials.screen.opacity = alpha;
    } else {
      stage1LaptopGroup.visible = false;
    }

    /* =============================================================
       STAGE 2: ABOUT (0.26 to 0.62) -> 3D DYNAMIC CODE MATRIX
       ============================================================= */
    if (p >= 0.24 && p < 0.64) {
      stage2CodeGroup.visible = true;

      let codeAlpha = 1.0;
      if (p < 0.36) {
        codeAlpha = (p - 0.26) / 0.10;
      } else if (p > 0.50) {
        codeAlpha = 1.0 - (p - 0.50) / 0.12;
      }
      codeAlpha = Math.min(Math.max(codeAlpha, 0), 1);

      let contract = 0;
      if (p > 0.48) {
        contract = (p - 0.48) / 0.14;
      }

      codePlanes.forEach((plane) => {
        plane.material.opacity = codeAlpha * 0.85;
        plane.position.z += plane.userData.speedZ;
        if (plane.position.z > 4) plane.position.z = -8;

        if (contract > 0) {
          plane.position.x = THREE.MathUtils.lerp(plane.userData.origPos.x, 0, contract);
          plane.position.y = THREE.MathUtils.lerp(plane.userData.origPos.y, 0, contract);
        } else {
          plane.position.x = plane.userData.origPos.x;
          plane.position.y = plane.userData.origPos.y;
        }

        plane.rotation.x += plane.userData.rotSpeedX;
        plane.rotation.y += plane.userData.rotSpeedY;
      });

      matrixParticles.material.opacity = codeAlpha * 0.7;
      matrixParticles.rotation.y = time * 0.05;
      matrixParticles.rotation.z = Math.sin(time * 0.1) * 0.05;

      stage2CodeGroup.rotation.y = -mTiltY * 0.5;
      stage2CodeGroup.rotation.x = mTiltX * 0.5;
    } else {
      stage2CodeGroup.visible = false;
    }

    /* =============================================================
       STAGE 3: RESUME / SKILLS (0.52 to 1.0) -> APPLE MAPS 3D GLOBE
       ============================================================= */
    if (p >= 0.52) {
      stage3GlobeGroup.visible = true;

      let globeAlpha = 1.0;
      if (p < 0.66) {
        globeAlpha = (p - 0.52) / 0.14;
      }
      globeAlpha = Math.min(Math.max(globeAlpha, 0), 1);

      const scale = THREE.MathUtils.lerp(0.2, 1.0, globeAlpha);
      stage3GlobeGroup.scale.set(scale, scale, scale);

      earthMesh.material.opacity = globeAlpha * 0.95;
      globeHudMesh.material.opacity = globeAlpha * 0.92;

      // Realistic Earth Steady Rotation (Tilted Axis)
      earthMesh.rotation.y = time * 0.12;
      orbitalRing.rotation.z = time * 0.05;

      // Pulse Honolulu Radar Ring
      if (honoluluBeacon) {
        const pulseScale = 1.0 + (time * 2.0 % 2.5) * 0.8;
        honoluluBeacon.children[1].scale.set(pulseScale, pulseScale, 1);
        honoluluBeacon.children[1].material.opacity = Math.max(0.9 - (time * 2.0 % 2.5) * 0.35, 0) * globeAlpha;
      }

      // Animate Ballistic Packets along 3D Cyber Arcs
      arcPackets.forEach(packet => {
        packet.material.opacity = globeAlpha * 0.9;
        const u = ((time * packet.userData.speed * 20 + packet.userData.offset) % 1.0);
        const pos = packet.userData.curve.getPoint(u);
        packet.position.copy(pos);

        // Threat Mitigation: Warning Orange switches to Secure Cyan / Green as it reaches Honolulu
        if (u < 0.55) {
          packet.material.color.setHex(0xff6b00); // Warning Orange
        } else {
          packet.material.color.setHex(0x38d9e6); // Deflected / Purified Cyan
        }
      });

      // Mouse Parallax on Globe View
      stage3GlobeGroup.rotation.y = mTiltY * 0.5;
      stage3GlobeGroup.rotation.x = -mTiltX * 0.5;

      materials.cyanLight.intensity = 2.8 + Math.sin(time * 3) * 0.6;
      materials.orangeLight.intensity = 2.0 + Math.cos(time * 2.5) * 0.5;
    } else {
      stage3GlobeGroup.visible = false;
    }

    renderer.render(scene, camera);
  }

  /* -------------------------------------------------------------
     SAFE AUTO-START
     ------------------------------------------------------------- */
  function startWhenReady() {
    if (typeof THREE !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    } else {
      let attempts = 0;
      const timer = setInterval(function () {
        attempts++;
        if (typeof THREE !== 'undefined') {
          clearInterval(timer);
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
          } else {
            init();
          }
        } else if (attempts > 50) {
          clearInterval(timer);
          console.error('Three.js failed to load within timeout.');
        }
      }, 50);
    }
  }

  startWhenReady();
})();
