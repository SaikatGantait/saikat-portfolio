import { useEffect, useRef } from "react";

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: 0, y: 0 };

    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.6 + Math.random() * 1.6,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      alpha: 0.35 + Math.random() * 0.35,
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -0.1 || particle.x > 1.1) particle.speedX *= -1;
        if (particle.y < -0.1 || particle.y > 1.1) particle.speedY *= -1;

        const parallaxX = mouse.x * 22;
        const parallaxY = mouse.y * 22;
        const px = particle.x * width + parallaxX;
        const py = particle.y * height + parallaxY;

        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 200, 255, ${particle.alpha})`;
        ctx.arc(px, py, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

export default ParticleField;
