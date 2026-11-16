"use client";

import { useEffect, useRef } from "react";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "@/lib/satinShader";

/**
 * Fond "satin noir dans le vent" : shader WebGL plein écran.
 * - résolution adaptative pour garder ~60 fps (mobile, tablette, desktop)
 * - réagit au pointeur (souris ou toucher)
 * - mis en pause quand l'onglet est caché
 * - image fixe si l'utilisateur préfère réduire les animations
 */
export default function SatinBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Le canvas est créé ici (et retiré au nettoyage) : en mode strict, React monte
    // le composant deux fois en dev, et un canvas réutilisé garderait un contexte WebGL perdu.
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      host.removeChild(canvas);
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(program, "r");
    const uT = gl.getUniformLocation(program, "t");
    const uM = gl.getUniformLocation(program, "m");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const maxScale = Math.min(window.devicePixelRatio || 1, 1.75);
    let scale = maxScale;
    let mx = 0.5,
      my = 0.5,
      sx = 0.5,
      sy = 0.5;
    let last = 0,
      ema = 16.7,
      acc = 0,
      time = 3;
    let raf = 0;
    let running = true;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onPointer = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = 1 - e.clientY / window.innerHeight;
    };

    const draw = () => {
      sx += (mx - sx) * 0.025;
      sy += (my - sy) * 0.025;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, time);
      gl.uniform2f(uM, sx, sy);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (ms: number) => {
      if (!running) return;
      const dt = last ? Math.min(ms - last, 50) : 16.7;
      last = ms;
      time += dt / 1000;
      ema += (dt - ema) * 0.05;
      acc += dt;
      if (acc > 1200) {
        acc = 0;
        if (ema > 21 && scale > 0.7) {
          scale = Math.max(0.7, scale * 0.85);
          resize();
        } else if (ema < 14.5 && scale < maxScale) {
          scale = Math.min(maxScale, scale * 1.08);
          resize();
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: -2, pointerEvents: "none" }}
    />
  );
}
