'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
uniform float uTime;
uniform vec2  uRes;
uniform float uDark;
varying vec2  vUv;

// simplex-style smooth noise
vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.,i1.y,1.)) + i.x + vec3(0.,i1.x,1.));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
  m = m*m; m = m*m;
  vec3 x = 2.*fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x *x0.x  + h.x *x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130. * dot(m, g);
}

void main(){
  vec2 uv = vUv;
  float t = uTime * 0.18;

  // layered noise
  float n1 = snoise(uv * 1.8 + vec2(t * 0.6, t * 0.4));
  float n2 = snoise(uv * 3.2 + vec2(-t * 0.3, t * 0.7) + 4.0);
  float n3 = snoise(uv * 5.5 + vec2(t * 0.2, -t * 0.5) + 8.0);
  float n  = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;
  n = n * 0.5 + 0.5; // remap to [0,1]

  // light palette: warm cream -> soft lavender -> pale rose
  vec3 lA = vec3(0.96, 0.94, 0.90);
  vec3 lB = vec3(0.82, 0.84, 0.96);
  vec3 lC = vec3(0.94, 0.88, 0.92);
  // dark palette: deep navy -> dark indigo -> dark slate
  vec3 dA = vec3(0.06, 0.06, 0.09);
  vec3 dB = vec3(0.08, 0.07, 0.14);
  vec3 dC = vec3(0.10, 0.08, 0.12);

  vec3 colA = mix(lA, dA, uDark);
  vec3 colB = mix(lB, dB, uDark);
  vec3 colC = mix(lC, dC, uDark);

  vec3 col = mix(colA, colB, smoothstep(0.2, 0.6, n));
  col      = mix(col,  colC, smoothstep(0.5, 0.9, n));

  // vignette
  vec2 q = uv - 0.5;
  float vig = 1.0 - dot(q*1.4, q*1.4);
  col *= 0.88 + 0.12 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroShader({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const isDark = () => document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
    const uniforms = {
      uTime: { value: 0 },
      uRes:  { value: new THREE.Vector2() },
      uDark: { value: isDark() },
    };

    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    let raf = 0;
    let startTime = performance.now();

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mo = new MutationObserver(() => {
      uniforms.uDark.value = isDark();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const tick = () => {
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      renderer.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
