'use client';

import * as React from 'react';

type PointerPosition = {
  x: number;
  y: number;
  active: boolean;
};

type HeroConstellationProps = {
  pointer: PointerPosition;
  reducedMotion: boolean;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  orbit: number;
};

export function HeroConstellation({ pointer, reducedMotion }: HeroConstellationProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointerRef = React.useRef(pointer);

  React.useEffect(() => {
    pointerRef.current = pointer;
  }, [pointer]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const targetCanvas = canvas;
    const targetContext = context;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    function createParticles() {
      const count = Math.min(46, Math.max(28, Math.floor(width / 30)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.1 + Math.random() * 1.75,
        speed: 0.09 + Math.random() * 0.2,
        angle: (index * 137.5 * Math.PI) / 180,
        orbit: 0.65 + Math.random() * 1.2,
      }));
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = targetCanvas.offsetWidth;
      height = targetCanvas.offsetHeight;
      targetCanvas.width = Math.floor(width * ratio);
      targetCanvas.height = Math.floor(height * ratio);
      targetContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    }

    function render(time = 0) {
      targetContext.clearRect(0, 0, width, height);
      const activePointer = pointerRef.current;
      const pullX = activePointer.active ? (activePointer.x - 0.5) * 15 : 0;
      const pullY = activePointer.active ? (activePointer.y - 0.5) * 12 : 0;

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y +=
            Math.sin(particle.angle) * particle.speed +
            Math.sin(time * 0.00072 + index) * 0.06;
          particle.x += pullX * 0.0015 * particle.orbit;
          particle.y += pullY * 0.0015 * particle.orbit;
        }

        if (particle.x < -18) particle.x = width + 18;
        if (particle.x > width + 18) particle.x = -18;
        if (particle.y < -18) particle.y = height + 18;
        if (particle.y > height + 18) particle.y = -18;
      });

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const first = particles[firstIndex];
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < 128) {
            const opacity = (1 - distance / 128) * 0.26;
            targetContext.beginPath();
            targetContext.moveTo(first.x, first.y);
            targetContext.lineTo(second.x, second.y);
            targetContext.strokeStyle = 'rgba(239, 68, 68, ' + opacity + ')';
            targetContext.lineWidth = 0.7;
            targetContext.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const pulse = reducedMotion ? 1 : 0.78 + Math.sin(time * 0.0018 + particle.angle) * 0.22;
        const radius = particle.size * pulse;

        targetContext.beginPath();
        targetContext.arc(particle.x, particle.y, radius * 2.7, 0, Math.PI * 2);
        targetContext.fillStyle = 'rgba(248, 113, 113, 0.09)';
        targetContext.fill();

        targetContext.beginPath();
        targetContext.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        targetContext.fillStyle = 'rgba(248, 113, 113, 0.84)';
        targetContext.shadowColor = 'rgba(248, 113, 113, 0.64)';
        targetContext.shadowBlur = 10;
        targetContext.fill();
        targetContext.shadowBlur = 0;
      });

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(targetCanvas);
    resize();
    render();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return <canvas className='pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-80' ref={canvasRef} aria-hidden='true' />;
}
