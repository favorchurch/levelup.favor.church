"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// Simple Flappy-style canvas mini-game. Tap/space to flap.
// Posts score to /api/complete-day?step=minigame on close (server caps).
export default function Minigame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 360 * dpr;
    canvas.height = 520 * dpr;
    ctx.scale(dpr, dpr);
    const w = 360,
      h = 520;

    let bolt = { x: 90, y: 200, vy: 0, r: 14 };
    let pipes: { x: number; gapY: number; passed: boolean }[] = [];
    const GAP = 150;
    const PIPE_W = 56;
    let frame = 0;
    let s = 0;
    let alive = true;
    let raf = 0;

    function reset() {
      bolt = { x: 90, y: 200, vy: 0, r: 14 };
      pipes = [];
      frame = 0;
      s = 0;
      alive = true;
      setScore(0);
      setDead(false);
    }

    function flap() {
      if (!alive) {
        reset();
        return;
      }
      bolt.vy = -6.4;
    }

    function loop() {
      frame++;
      bolt.vy += 0.34;
      bolt.y += bolt.vy;

      if (frame % 90 === 0) {
        const gapY = 80 + Math.random() * (h - GAP - 160);
        pipes.push({ x: w, gapY, passed: false });
      }
      pipes.forEach((p) => (p.x -= 2.4));
      pipes = pipes.filter((p) => p.x + PIPE_W > -10);

      // collisions
      for (const p of pipes) {
        if (
          bolt.x + bolt.r > p.x &&
          bolt.x - bolt.r < p.x + PIPE_W &&
          (bolt.y - bolt.r < p.gapY || bolt.y + bolt.r > p.gapY + GAP)
        ) {
          alive = false;
        }
        if (!p.passed && p.x + PIPE_W < bolt.x) {
          p.passed = true;
          s++;
          setScore(s);
        }
      }
      if (bolt.y + bolt.r > h || bolt.y - bolt.r < 0) alive = false;

      // draw
      ctx.fillStyle = "#0e0e0e";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#ff5723";
      pipes.forEach((p) => {
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        ctx.fillRect(p.x, p.gapY + GAP, PIPE_W, h - (p.gapY + GAP));
      });

      // bolt
      ctx.save();
      ctx.translate(bolt.x, bolt.y);
      ctx.rotate(Math.max(-0.6, Math.min(0.9, bolt.vy / 10)));
      ctx.fillStyle = "#ffb5a0";
      ctx.beginPath();
      ctx.moveTo(-10, -14);
      ctx.lineTo(6, -2);
      ctx.lineTo(-2, -2);
      ctx.lineTo(10, 14);
      ctx.lineTo(-6, 2);
      ctx.lineTo(2, 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#e2e2e2";
      ctx.font = "bold 28px Montserrat, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(s), w / 2, 48);

      if (alive) {
        raf = requestAnimationFrame(loop);
      } else {
        setDead(true);
      }
    }

    raf = requestAnimationFrame(loop);

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();
        flap();
      }
      if (e.key === "Escape") onClose();
    }
    function onPointer() {
      flap();
    }
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function handleClose() {
    if (!submittedRef.current && score > 0) {
      submittedRef.current = true;
      try {
        await fetch("/api/complete-day?step=minigame", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ score }),
        });
      } catch {
        // ignore — XP is bonus, not load-bearing.
      }
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-md">
      <div className="w-full max-w-sm flex items-center justify-between mb-md">
        <span className="font-headline-lg text-title-md text-primary uppercase tracking-tight">
          Bolt Run
        </span>
        <button
          onClick={handleClose}
          className="bg-surface-container-high rounded-full p-2 text-on-surface hover:bg-surface-bright"
          aria-label="Close mini-game"
        >
          <Icon name="close" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: 360, height: 520, touchAction: "none" }}
        className="rounded-xl border-2 border-primary-container/30 bg-surface-container-lowest"
      />
      <p className="font-label-bold text-label-sm text-on-surface-variant mt-md text-center">
        TAP / SPACE TO FLAP{dead ? " — TAP TO RETRY" : ""}. CAPPED AT +50 XP/DAY.
      </p>
    </div>
  );
}
