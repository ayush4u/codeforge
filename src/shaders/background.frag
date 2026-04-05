uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

// Simplex-style noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for(int i = 0; i < 5; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // Mouse influence
  vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
  float mouseInfluence = smoothstep(0.8, 0.0, length(p - mouse)) * 0.15;

  // Flowing noise
  float n1 = fbm(p * 1.8 + uTime * 0.08);
  float n2 = fbm(p * 2.5 - uTime * 0.06 + vec2(5.0, 3.0));
  float n3 = fbm(p * 0.8 + vec2(n1, n2) * 0.5 + uTime * 0.04);

  // Warm parchment palette
  vec3 col1 = vec3(0.969, 0.953, 0.929); // warm white
  vec3 col2 = vec3(0.929, 0.910, 0.875); // warm beige
  vec3 col3 = vec3(0.886, 0.860, 0.820); // deeper warm
  vec3 colAccent = vec3(0.176, 0.353, 0.482); // ocean blue hint

  // Mix colors based on noise
  vec3 color = mix(col1, col2, smoothstep(-0.3, 0.5, n3));
  color = mix(color, col3, smoothstep(0.1, 0.8, n1 * n2) * 0.5);

  // Subtle accent wash from mouse
  color = mix(color, colAccent, mouseInfluence * smoothstep(-0.2, 0.4, n3));

  // Subtle radial vignette (very light)
  float vignette = 1.0 - smoothstep(0.3, 1.2, length(p) * 0.7);
  color = mix(color * 0.96, color, vignette);

  gl_FragColor = vec4(color, 1.0);
}
