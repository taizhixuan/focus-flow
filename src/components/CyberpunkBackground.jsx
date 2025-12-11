import React, { useEffect, useRef } from 'react';

const CyberpunkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Configuration
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Cyberpunk palette
    const COLORS = ['#00f3ff', '#bd00ff', '#ffffff']; // Cyan, Magenta, White
    
    // Rain configuration
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アィイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start above screen with random offset
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      // Reset drops if width changes drastically, or just retain
      if (drops.length < columns) {
        for (let i = drops.length; i < columns; i++) {
             drops[i] = Math.random() * -100;
        }
      }
    };

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(5, 5, 10, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0'; // Default, will be overridden
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random color for each character (glitch effect)
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Cyberpunk coloring: mostly Cyan/Magenta, some White highlights
        ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = ctx.fillStyle;

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset glow
        ctx.shadowBlur = 0;

        // Reset drop to top randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#050510]"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default CyberpunkBackground;
