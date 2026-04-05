varying float vAlpha;
varying float vScale;

void main() {
  // Soft circle
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
  
  // Warm colors — mixing copper and ocean blue
  vec3 color = mix(
    vec3(0.753, 0.447, 0.204), // copper
    vec3(0.176, 0.353, 0.482), // ocean blue
    vScale
  );
  
  alpha *= vAlpha * 0.4;
  
  if(alpha < 0.01) discard;
  
  gl_FragColor = vec4(color, alpha);
}
