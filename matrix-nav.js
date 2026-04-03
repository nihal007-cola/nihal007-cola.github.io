// MATRIX NAV ENGINE - TRUE 3D CINEMATIC TRANSITIONS

(function() {
  // ============================================
  // 3D TRANSITION EFFECTS
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
  // SETUP 3D SCENE
  // ============================================
  let isAnimating = false;
  let animationWrapper = null;
  let originalTransform = null;
  
  function setup3DContext() {
    // Set perspective on html
    document.documentElement.style.perspective = "1200px";
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
  // 3D TRANSITION IMPLEMENTATIONS
  // ============================================
  
  // 1. Cube Rotation (page rotates like cube face)
  function applyCubeRotate(element, isOut) {
    const rotateY = isOut ? "rotateY(-90deg)" : "rotateY(0deg)";
    element.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotateY;
    element.style.backfaceVisibility = "visible";
  }
  
  // 2. Card Flip (rotateX with perspective)
  function applyCardFlip(element, isOut) {
    const rotateX = isOut ? "rotateX(180deg)" : "rotateX(0deg)";
    element.style.transition = "transform 0.85s cubic-bezier(0.23, 1, 0.32, 1)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotateX;
    element.style.backfaceVisibility = "hidden";
  }
  
  // 3. Depth Zoom (translateZ camera movement)
  function applyDepthZoom(element, isOut) {
    const translateZ = isOut ? "translateZ(-400px) scale(0.8)" : "translateZ(0) scale(1)";
    element.style.transition = "transform 0.9s cubic-bezier(0.55, 0.085, 0.68, 0.53)";
    element.style.transformOrigin = "center center";
    element.style.transform = translateZ;
  }
  
  // 4. Tunnel Warp (deep perspective pull)
  function applyTunnelWarp(element, isOut) {
    const transform = isOut ? "translateZ(-500px) scale(1.5) rotateY(15deg)" : "translateZ(0) scale(1) rotateY(0deg)";
    element.style.transition = "transform 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = transform;
  }
  
  // 5. Tilt + Drift (camera angle shift)
  function applyTiltDrift(element, isOut) {
    const rotateX = isOut ? "rotateX(45deg) translateY(-100px)" : "rotateX(0deg) translateY(0)";
    const rotateY = isOut ? "rotateY(-15deg)" : "rotateY(0deg)";
    element.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    element.style.transformOrigin = "center top";
    element.style.transform = `${rotateX} ${rotateY}`;
  }
  
  // 6. Spiral Rotation in 3D
  function applySpiralRotate(element, isOut) {
    const rotate = isOut ? "rotateX(180deg) rotateY(180deg) rotateZ(180deg) scale(0.3)" : "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
    element.style.transition = "transform 0.95s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = rotate;
  }
  
  // 7. Door Open Effect (split illusion)
  function applyDoorOpen(element, isOut) {
    if (isOut) {
      const leftDoor = document.createElement("div");
      const rightDoor = document.createElement("div");
      leftDoor.style.position = "fixed";
      leftDoor.style.top = "0";
      leftDoor.style.left = "0";
      leftDoor.style.width = "50%";
      leftDoor.style.height = "100%";
      leftDoor.style.backgroundColor = "#000";
      leftDoor.style.transformOrigin = "left center";
      leftDoor.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      leftDoor.style.transform = "rotateY(0deg)";
      leftDoor.style.zIndex = "999999";
      
      rightDoor.style.position = "fixed";
      rightDoor.style.top = "0";
      rightDoor.style.right = "0";
      rightDoor.style.width = "50%";
      rightDoor.style.height = "100%";
      rightDoor.style.backgroundColor = "#000";
      rightDoor.style.transformOrigin = "right center";
      rightDoor.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      rightDoor.style.transform = "rotateY(0deg)";
      rightDoor.style.zIndex = "999999";
      
      document.body.appendChild(leftDoor);
      document.body.appendChild(rightDoor);
      
      setTimeout(() => {
        leftDoor.style.transform = "rotateY(-90deg)";
        rightDoor.style.transform = "rotateY(90deg)";
      }, 10);
      
      setTimeout(() => {
        leftDoor.remove();
        rightDoor.remove();
      }, 800);
    }
    
    element.style.transition = "opacity 0.4s ease";
    element.style.opacity = isOut ? "0" : "1";
  }
  
  // 8. Collapse into Center (Z-axis compression)
  function applyCollapseCenter(element, isOut) {
    const transform = isOut ? "translateZ(-200px) scale(0) rotateX(90deg)" : "translateZ(0) scale(1) rotateX(0deg)";
    element.style.transition = "transform 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.transformOrigin = "center center";
    element.style.transform = transform;
  }
  
  // 9. Diagonal 3D Slide
  function applyDiagonalSlide(element, isOut) {
    const translateX = isOut ? "translateX(200px)" : "translateX(0)";
    const translateY = isOut ? "translateY(200px)" : "translateY(0)";
    const rotateZ = isOut ? "rotateZ(45deg)" : "rotateZ(0deg)";
    element.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    element.style.transformOrigin = "center center";
    element.style.transform = `${translateX} ${translateY} ${rotateZ} scale(0.8)`;
  }
  
  // 10. Inverted Flip (rotate + scale + depth)
  function applyInvertedFlip(element, isOut) {
    const transform = isOut ? "rotateX(270deg) rotateY(180deg) translateZ(-300px) scale(0.5)" : "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    element.style.transition = "transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
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
  // SYNTHESIZED SOUND EFFECT
  // ============================================
  function playTransitionSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create main oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = 80;
      
      // Create gain for envelope
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Attack/decay envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      oscillator.start(now);
      oscillator.stop(now + 0.7);
      
      // Add subtle harmonic
      const harmonicOsc = audioContext.createOscillator();
      harmonicOsc.type = "triangle";
      harmonicOsc.frequency.value = 160;
      const harmonicGain = audioContext.createGain();
      harmonicGain.gain.value = 0;
      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(audioContext.destination);
      
      harmonicGain.gain.setValueAtTime(0, now);
      harmonicGain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      harmonicOsc.start(now);
      harmonicOsc.stop(now + 0.6);
      
      // Resume audio context if suspended
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
    } catch(e) {
      // Silent fail
    }
  }
  
  // ============================================
  // MAIN NAVIGATION HANDLER
  // ============================================
  function navigateWith3D(url) {
    if (isAnimating) return;
    isAnimating = true;
    
    const effect = randEffect();
    
    // Setup 3D context
    setup3DContext();
    
    // Store original transform
    originalTransform = document.body.style.transform;
    
    // Play sound
    playTransitionSound();
    
    // Add cyberpunk overlay effect
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 255, 0, 0.05)";
    overlay.style.zIndex = "999997";
    overlay.style.pointerEvents = "none";
    overlay.style.animation = "matrixPulse 0.5s ease-out";
    document.body.appendChild(overlay);
    
    // Add keyframes for pulse
    if (!document.querySelector("#matrix-nav-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "matrix-nav-styles";
      styleSheet.textContent = `
        @keyframes matrixPulse {
          0% { opacity: 0; }
          20% { opacity: 1; background-color: rgba(0, 255, 0, 0.15); }
          100% { opacity: 0; background-color: rgba(0, 255, 0, 0); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Apply 3D transition to body
    applyEffect(effect, document.body, true);
    
    // Cleanup and navigate
    setTimeout(() => {
      // Remove overlay
      if (overlay && overlay.parentNode) overlay.remove();
      
      // Reset body styles
      document.body.style.transition = "";
      document.body.style.transform = "";
      document.body.style.opacity = "";
      
      // Cleanup 3D context
      cleanup3DContext();
      
      // Navigate to new page
      window.location.href = url;
    }, 850); // Slightly longer than longest transition
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
    // Simple reload for back/forward - no animation
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
  `;
  document.head.appendChild(initStyles);
  
  // Log initialization
  console.log("🎬 MATRIX NAV ENGINE v3.0 | TRUE 3D TRANSITIONS ACTIVE");
})();
