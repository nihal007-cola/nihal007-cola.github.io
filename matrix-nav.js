// MATRIX NAV ENGINE - NEON RED 3D CINEMATIC TRANSITIONS

(function() {
  // ============================================
  // ENHANCED 3D TRANSITION EFFECTS - NEON RED EDITION
  // ============================================
  const effects = [
    "cubeRotate",
    "cardFlip",
    "depthZoom",
    "tunnelWarp",
    "tiltDrift",
    "spiralRotate",
    "doorOpen",
    "collapseCenter",
    "diagonalSlide",
    "invertedFlip"
  ];

  // Random effect selector
  function randEffect() {
    return effects[Math.floor(Math.random() * effects.length)];
  }

  // ============================================
  // SETUP 3D SCENE - ENHANCED PERSPECTIVE
  // ============================================
  let isAnimating = false;
  let animationWrapper = null;
  let originalTransform = null;
  
  function setup3DContext() {
    // Set perspective on html with deeper FOV
    document.documentElement.style.perspective = "1600px";
    document.documentElement.style.perspectiveOrigin = "50% 50%";
    document.documentElement.style.overflowX = "hidden";
    
    // Preserve 3D on body
    document.body.style.transformStyle = "preserve-3d";
    document.body.style.transformOrigin = "center center";
    document.body.style.backfaceVisibility = "visible";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    // Ensure body takes full viewport
    if (document.body.scrollHeight <= window.innerHeight) {
      document.body.style.minHeight = "100vh";
    }
  }
  
  function cleanup3DContext() {
    document.documentElement.style.perspective = "";
    document.documentElement.style.perspectiveOrigin = "";
    document.body.style.transformStyle = "";
    document.body.style.transformOrigin = "";
    document.body.style.backfaceVisibility = "";
    document.body.style.minHeight = "";
  }
  
  // Create animation wrapper if needed
  function getAnimationWrapper() {
    if (!animationWrapper) {
      animationWrapper = document.createElement("div");
      animationWrapper.style.position = "fixed";
      animationWrapper.style.top = "0";
      animationWrapper.style.left = "0";
      animationWrapper.style.width = "100%";
      animationWrapper.style.height = "100%";
      animationWrapper.style.zIndex = "999998";
      animationWrapper.style.pointerEvents = "none";
      animationWrapper.style.transformStyle = "preserve-3d";
      animationWrapper.style.backfaceVisibility = "visible";
      document.body.appendChild(animationWrapper);
    }
    return animationWrapper;
  }
  
  // ============================================
  // NEON RED VISUAL EFFECTS
  // ============================================
  function createRedFlash() {
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.backgroundColor = "#ff0033";
    flash.style.zIndex = "999999";
    flash.style.pointerEvents = "none";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 0.2s ease-out";
    document.body.appendChild(flash);
    
    setTimeout(() => { flash.style.opacity = "0.45"; }, 10);
    setTimeout(() => { flash.style.opacity = "0"; }, 180);
    setTimeout(() => { if(flash && flash.parentNode) flash.remove(); }, 500);
  }
  
  function addRedMatrixOverlay() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "radial-gradient(circle, rgba(255,0,50,0.15) 0%, rgba(0,0,0,0) 80%)";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "999996";
    overlay.style.mixBlendMode = "overlay";
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 700);
  }
  
  // ============================================
  // SYNTHESIZED SOUND EFFECT - RED THEME
  // ============================================
  function playTransitionSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Deep bass drop (neon red intensity)
      const bassOsc = audioContext.createOscillator();
      bassOsc.type = "sawtooth";
      bassOsc.frequency.value = 55;
      const bassGain = audioContext.createGain();
      bassGain.gain.value = 0;
      bassOsc.connect(bassGain);
      bassGain.connect(audioContext.destination);
      
      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.2, now + 0.03);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      bassOsc.start(now);
      bassOsc.stop(now + 0.7);
      
      // Aggressive mid-harmonic
      const midOsc = audioContext.createOscillator();
      midOsc.type = "square";
      midOsc.frequency.value = 220;
      const midGain = audioContext.createGain();
      midGain.gain.value = 0;
      midOsc.connect(midGain);
      midGain.connect(audioContext.destination);
      midGain.gain.setValueAtTime(0, now);
      midGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      midOsc.start(now);
      midOsc.stop(now + 0.6);
      
      // Red glitch noise
      const noiseNode = audioContext.createBufferSource();
      const bufferSize = audioContext.sampleRate * 0.2;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      noiseNode.buffer = buffer;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.08;
      noiseNode.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noiseNode.start(now);
      noiseNode.stop(now + 0.2);
      
      // Resume audio context if suspended
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
    } catch(e) {
      // Silent fail
    }
  }
  
  // ============================================
  // 3D TRANSITION IMPLEMENTATIONS - ENHANCED
  // ============================================
  
  // 1. Cube Rotation (page rotates like cube face)
  function applyCubeRotate(element, isOut) {
    const rotateY = isOut ? "rotateY(-90deg) scale(0.96)" : "rotateY(0deg) scale(1)";
    element.style.transition = "transform 0.85s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotateY;
    element.style.backfaceVisibility = "visible";
  }
  
  // 2. Card Flip (rotateX with perspective)
  function applyCardFlip(element, isOut) {
    const rotateX = isOut ? "rotateX(180deg) scale(0.9)" : "rotateX(0deg) scale(1)";
    element.style.transition = "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1.2)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotateX;
    element.style.backfaceVisibility = "hidden";
  }
  
  // 3. Depth Zoom (translateZ camera movement)
  function applyDepthZoom(element, isOut) {
    const translateZ = isOut ? "translateZ(-550px) scale(0.6)" : "translateZ(0) scale(1)";
    element.style.transition = "transform 0.95s cubic-bezier(0.55, 0.085, 0.68, 0.53)";
    element.style.transformOrigin = "center center";
    element.style.transform = translateZ;
  }
  
  // 4. Tunnel Warp (deep perspective pull)
  function applyTunnelWarp(element, isOut) {
    const transform = isOut ? "translateZ(-700px) scale(1.8) rotateY(18deg) rotateX(5deg)" : "translateZ(0) scale(1) rotateY(0deg)";
    element.style.transition = "transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = transform;
  }
  
  // 5. Tilt + Drift (camera angle shift)
  function applyTiltDrift(element, isOut) {
    const rotateX = isOut ? "rotateX(55deg) translateY(-140px)" : "rotateX(0deg) translateY(0)";
    const rotateY = isOut ? "rotateY(-22deg)" : "rotateY(0deg)";
    element.style.transition = "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1.1)";
    element.style.transformOrigin = "center top";
    element.style.transform = `${rotateX} ${rotateY} scale(0.85)`;
  }
  
  // 6. Spiral Rotation in 3D
  function applySpiralRotate(element, isOut) {
    const rotate = isOut ? "rotateX(200deg) rotateY(200deg) rotateZ(200deg) scale(0.25)" : "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
    element.style.transition = "transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotate;
  }
  
  // 7. Door Open Effect (split illusion with red theme)
  function applyDoorOpen(element, isOut) {
    if (isOut) {
      const leftDoor = document.createElement("div");
      const rightDoor = document.createElement("div");
      
      leftDoor.style.position = "fixed";
      leftDoor.style.top = "0";
      leftDoor.style.left = "0";
      leftDoor.style.width = "50%";
      leftDoor.style.height = "100%";
      leftDoor.style.backgroundColor = "#1a0000";
      leftDoor.style.backgroundImage = "linear-gradient(90deg, #ff0040 0%, #000 100%)";
      leftDoor.style.transformOrigin = "left center";
      leftDoor.style.transition = "transform 0.85s cubic-bezier(0.34, 1.2, 0.64, 1)";
      leftDoor.style.transform = "rotateY(0deg)";
      leftDoor.style.zIndex = "999999";
      leftDoor.style.boxShadow = "10px 0 30px rgba(255,0,64,0.6)";
      
      rightDoor.style.position = "fixed";
      rightDoor.style.top = "0";
      rightDoor.style.right = "0";
      rightDoor.style.width = "50%";
      rightDoor.style.height = "100%";
      rightDoor.style.backgroundColor = "#1a0000";
      rightDoor.style.backgroundImage = "linear-gradient(-90deg, #ff0040 0%, #000 100%)";
      rightDoor.style.transformOrigin = "right center";
      rightDoor.style.transition = "transform 0.85s cubic-bezier(0.34, 1.2, 0.64, 1)";
      rightDoor.style.transform = "rotateY(0deg)";
      rightDoor.style.zIndex = "999999";
      rightDoor.style.boxShadow = "-10px 0 30px rgba(255,0,64,0.6)";
      
      document.body.appendChild(leftDoor);
      document.body.appendChild(rightDoor);
      
      setTimeout(() => {
        leftDoor.style.transform = "rotateY(-100deg)";
        rightDoor.style.transform = "rotateY(100deg)";
      }, 15);
      
      setTimeout(() => {
        leftDoor.remove();
        rightDoor.remove();
      }, 880);
    }
    
    element.style.transition = "opacity 0.3s ease";
    element.style.opacity = isOut ? "0" : "1";
  }
  
  // 8. Collapse into Center (Z-axis compression)
  function applyCollapseCenter(element, isOut) {
    const transform = isOut ? "translateZ(-350px) scale(0) rotateX(110deg)" : "translateZ(0) scale(1) rotateX(0deg)";
    element.style.transition = "transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = transform;
  }
  
  // 9. Diagonal 3D Slide
  function applyDiagonalSlide(element, isOut) {
    const translateX = isOut ? "translateX(280px)" : "translateX(0)";
    const translateY = isOut ? "translateY(280px)" : "translateY(0)";
    const rotateZ = isOut ? "rotateZ(55deg)" : "rotateZ(0deg)";
    element.style.transition = "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)";
    element.style.transformOrigin = "center center";
    element.style.transform = `${translateX} ${translateY} ${rotateZ} scale(0.65)`;
  }
  
  // 10. Inverted Flip (rotate + scale + depth)
  function applyInvertedFlip(element, isOut) {
    const transform = isOut ? "rotateX(300deg) rotateY(210deg) translateZ(-450px) scale(0.4)" : "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    element.style.transition = "transform 1.05s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = transform;
  }
  
  // Effect dispatcher
  function applyEffect(effectName, element, isOut) {
    switch(effectName) {
      case "cubeRotate":
        applyCubeRotate(element, isOut);
        break;
      case "cardFlip":
        applyCardFlip(element, isOut);
        break;
      case "depthZoom":
        applyDepthZoom(element, isOut);
        break;
      case "tunnelWarp":
        applyTunnelWarp(element, isOut);
        break;
      case "tiltDrift":
        applyTiltDrift(element, isOut);
        break;
      case "spiralRotate":
        applySpiralRotate(element, isOut);
        break;
      case "doorOpen":
        applyDoorOpen(element, isOut);
        break;
      case "collapseCenter":
        applyCollapseCenter(element, isOut);
        break;
      case "diagonalSlide":
        applyDiagonalSlide(element, isOut);
        break;
      case "invertedFlip":
        applyInvertedFlip(element, isOut);
        break;
      default:
        applyDepthZoom(element, isOut);
    }
  }
  
  // ============================================
  // MAIN NAVIGATION HANDLER - NEON RED EDITION
  // ============================================
  function navigateWith3D(url) {
    if (isAnimating) return;
    isAnimating = true;
    
    const effect = randEffect();
    
    // Setup 3D context
    setup3DContext();
    
    // Store original transform
    originalTransform = document.body.style.transform;
    
    // Play red-themed sound
    playTransitionSound();
    
    // Add neon red visual effects
    createRedFlash();
    addRedMatrixOverlay();
    
    // Add red border pulse
    const redBorder = document.createElement("div");
    redBorder.style.position = "fixed";
    redBorder.style.top = "0";
    redBorder.style.left = "0";
    redBorder.style.width = "100%";
    redBorder.style.height = "100%";
    redBorder.style.border = "4px solid #ff0040";
    redBorder.style.boxSizing = "border-box";
    redBorder.style.pointerEvents = "none";
    redBorder.style.zIndex = "999998";
    redBorder.style.opacity = "0";
    redBorder.style.transition = "opacity 0.2s";
    document.body.appendChild(redBorder);
    setTimeout(() => { redBorder.style.opacity = "0.9"; }, 10);
    setTimeout(() => { redBorder.style.opacity = "0"; }, 300);
    setTimeout(() => redBorder.remove(), 400);
    
    // Apply 3D transition to body
    applyEffect(effect, document.body, true);
    
    // Cleanup and navigate
    setTimeout(() => {
      // Remove any remaining elements
      if (redBorder && redBorder.parentNode) redBorder.remove();
      
      // Reset body styles
      document.body.style.transition = "";
      document.body.style.transform = "";
      document.body.style.opacity = "";
      
      // Cleanup 3D context
      cleanup3DContext();
      
      // Navigate to new page
      window.location.href = url;
    }, 980);
  }
  
  // ============================================
  // INTERCEPT LINK CLICKS
  // ============================================
  function handleLinkClick(event) {
    const target = event.target.closest("a");
    if (!target) return;
    
    const href = target.getAttribute("href");
    if (!href || href === "" || href.startsWith("#") || href.startsWith("javascript:")) return;
    
    // Check if external link
    const isExternal = target.target === "_blank" || 
                      (href.startsWith("http") && !href.includes(window.location.hostname));
    
    if (isExternal) return;
    
    // Check if download or mailto
    if (target.hasAttribute("download") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    navigateWith3D(href);
  }
  
  // Initialize event listener
  document.addEventListener("click", handleLinkClick);
  
  // Handle popstate (back/forward navigation)
  window.addEventListener("popstate", function() {
    window.location.reload();
  });
  
  // Pre-initialize styles
  const initStyles = document.createElement("style");
  initStyles.textContent = `
    * {
      -webkit-tap-highlight-color: transparent;
    }
    
    body {
      transition: none !important;
    }
    
    a {
      cursor: pointer;
    }
    
    ::selection {
      background: #ff0040;
      color: #000;
    }
  `;
  document.head.appendChild(initStyles);
  
  // Log initialization
  console.log("🔴 MATRIX NAV ENGINE v4.0 | NEON RED 3D TRANSITIONS ACTIVE 🔴");
})();
