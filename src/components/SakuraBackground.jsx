import React, { useEffect, useRef } from 'react';

const SakuraBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Configuration
    const PARTICLE_COUNT = 100;
    const COLORS = [
      { r: 255, g: 183, b: 178 }, // Soft Pink
      { r: 255, g: 218, b: 224 }, // Lighter Pink
      { r: 255, g: 255, b: 255 }  // White
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * windowWidth;
        this.y = initial ? Math.random() * windowHeight : -20;
        this.size = Math.random() * 5 + 3;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        // Interaction physics
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Natural movement
        this.x += this.speedX + this.vx;
        this.y += this.speedY + this.vy;
        this.rotation += this.rotationSpeed;

        // Mouse interaction (Wind)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.2;
          this.vy += Math.sin(angle) * force * 0.2;
        }

        // Friction
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Reset if out of bounds
        if (this.y > windowHeight + 20 || this.x < -20 || this.x > windowWidth + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        
        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      canvas.width = windowWidth;
      canvas.height = windowHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, windowWidth, windowHeight);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, windowHeight);
      gradient.addColorStop(0, '#2e1065'); // Deep purple
      gradient.addColorStop(0.5, '#4c1d95'); // Purple
      gradient.addColorStop(1, '#be185d'); // Pink
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, windowWidth, windowHeight);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }} // Allow clicks to pass through except we capture mousemove on window
    />
  );
};

export default SakuraBackground;
