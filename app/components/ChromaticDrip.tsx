"use client";

import { useEffect, useRef } from "react";

type Drip = {
  x: number;
  y: number;
  radius: number;
  hue: number;
  speed: number;
};

type Direction = {
  x: number;
  y: number;
};

const DRIP_COUNT = 90;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ChromaticDrip() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dripsRef = useRef<Drip[]>([]);
  const directionRef = useRef<Direction>({ x: 0, y: 1 });
  const targetDirectionRef = useRef<Direction>({ x: 0, y: 1 });
  const pointerRef = useRef({ x: 0, y: 0, holding: false });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const setCanvasSize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const initializeDrips = () => {
      dripsRef.current = Array.from({ length: DRIP_COUNT }).map((_, index) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 60 + Math.random() * 100,
        hue: 200 + (index / DRIP_COUNT) * 140,
        speed: 0.5 + Math.random() * 1.4,
      }));
    };

    const updateDirection = () => {
      const current = directionRef.current;
      const target = targetDirectionRef.current;
      directionRef.current = {
        x: current.x + (target.x - current.x) * 0.06,
        y: current.y + (target.y - current.y) * 0.06,
      };
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(109, 124, 255, 0.12)");
      gradient.addColorStop(0.45, "rgba(255, 115, 225, 0.1)");
      gradient.addColorStop(1, "rgba(10, 10, 15, 0.9)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      updateDirection();
      const direction = directionRef.current;

      dripsRef.current.forEach((drip) => {
        drip.x += direction.x * drip.speed * 2;
        drip.y += direction.y * drip.speed * 2;

        if (drip.y - drip.radius > height) {
          drip.y = -drip.radius;
          drip.x = Math.random() * width;
        }

        if (drip.x - drip.radius > width) {
          drip.x = -drip.radius;
        }

        if (drip.x + drip.radius < 0) {
          drip.x = width + drip.radius;
        }

        const dripGradient = context.createRadialGradient(
          drip.x,
          drip.y,
          0,
          drip.x,
          drip.y,
          drip.radius
        );
        dripGradient.addColorStop(
          0,
          `hsla(${drip.hue}, 100%, 70%, 0.45)`
        );
        dripGradient.addColorStop(
          0.45,
          `hsla(${drip.hue + 40}, 100%, 60%, 0.15)`
        );
        dripGradient.addColorStop(1, "rgba(7, 7, 11, 0)");

        context.fillStyle = dripGradient;
        context.beginPath();
        context.arc(drip.x, drip.y, drip.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationRef.current = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY, movementX, movementY } = event;
      pointerRef.current.x = clientX;
      pointerRef.current.y = clientY;

      if (pointerRef.current.holding) return;

      const magnitude = Math.hypot(movementX, movementY);
      if (magnitude > 0.2) {
        targetDirectionRef.current = {
          x: clamp(movementX / 30, -1.2, 1.2),
          y: clamp(1 + movementY / 60, -0.6, 2),
        };
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerRef.current.holding = true;
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetDirectionRef.current = {
        x: clamp((clientX - centerX) / centerX, -1.4, 1.4),
        y: clamp((clientY - centerY) / centerY, -0.4, 2),
      };
    };

    const handlePointerUp = () => {
      pointerRef.current.holding = false;
      targetDirectionRef.current = { x: 0, y: 1 };
    };

    setCanvasSize();
    initializeDrips();
    draw();

    const handleResize = () => {
      setCanvasSize();
      initializeDrips();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}