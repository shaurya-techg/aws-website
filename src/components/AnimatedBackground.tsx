'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  type: 'normal' | 'bright' | 'star';
}

const COLORS = [
  'rgba(132, 58, 237,',   // purple
  'rgba(67, 73, 255,',    // indigo
  'rgba(176, 106, 224,',  // light violet
  'rgba(99, 102, 241,',   // softer indigo
  'rgba(139, 92, 246,',   // violet
  'rgba(168, 85, 247,',   // bright purple
  'rgba(79, 70, 229,',    // deep indigo
];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const createParticles = useCallback((width: number, height: number) => {
    const area = width * height;
    const count = Math.min(Math.floor(area / 10000), 180);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      // 10% are "star" particles (large, bright), 25% are "bright", rest normal
      const type: Particle['type'] = rand < 0.1 ? 'star' : rand < 0.35 ? 'bright' : 'normal';

      const radius = type === 'star' ? Math.random() * 3 + 2.5
        : type === 'bright' ? Math.random() * 2.5 + 1.5
        : Math.random() * 1.8 + 0.8;

      const opacity = type === 'star' ? Math.random() * 0.3 + 0.6
        : type === 'bright' ? Math.random() * 0.3 + 0.4
        : Math.random() * 0.35 + 0.2;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        opacity,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulseSpeed: Math.random() * 0.025 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        type,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dimensionsRef.current = { w, h };
      particlesRef.current = createParticles(w, h);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const animate = () => {
      const { w, h } = dimensionsRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);
      time += 1;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulse opacity
        const pulseRange = p.type === 'star' ? 0.3 : 0.2;
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * pulseRange + (1 - pulseRange);
        const currentOpacity = p.opacity * pulse;

        // Mouse interaction — gentle repulsion with glow boost
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        let mouseGlowBoost = 1;
        if (distToMouse < 200) {
          const force = (200 - distToMouse) / 200 * 0.03;
          p.vx += (dx / distToMouse) * force;
          p.vy += (dy / distToMouse) * force;
          mouseGlowBoost = 1 + (200 - distToMouse) / 200 * 0.8;
        }

        // Dampen velocity
        p.vx *= 0.998;
        p.vy *= 0.998;

        const glowMultiplier = p.type === 'star' ? 8 : p.type === 'bright' ? 6 : 5;
        const boostedOpacity = Math.min(currentOpacity * mouseGlowBoost, 1);

        // Draw outer glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * glowMultiplier);
        gradient.addColorStop(0, `${p.color} ${boostedOpacity * 0.8})`);
        gradient.addColorStop(0.4, `${p.color} ${boostedOpacity * 0.3})`);
        gradient.addColorStop(1, `${p.color} 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * glowMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${boostedOpacity})`;
        ctx.fill();

        // Star particles get a white-hot center
        if (p.type === 'star') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${boostedOpacity * 0.6})`;
          ctx.fill();
        }
      }

      // Draw connections — wider range, brighter, thicker
      const connectionDist = 180;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.25;
            // Brighter lines between star/bright particles
            const boost = (particles[i].type !== 'normal' || particles[j].type !== 'normal') ? 1.5 : 1;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Gradient line from one particle color to the other
            const lineGrad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            lineGrad.addColorStop(0, `${particles[i].color} ${opacity * boost})`);
            lineGrad.addColorStop(1, `${particles[j].color} ${opacity * boost})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = boost > 1 ? 0.8 : 0.6;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      id="animated-bg-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
