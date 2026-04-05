uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // Fresnel
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  // Base colors
  vec3 col1 = vec3(0.176, 0.353, 0.482); // ocean blue
  vec3 col2 = vec3(0.753, 0.447, 0.204); // copper
  vec3 col3 = vec3(0.482, 0.247, 0.365); // burgundy

  vec3 color = mix(col1, col2, smoothstep(-0.2, 0.3, vDisplacement));
  color = mix(color, col3, fresnel * 0.5);
  
  // Subtle rim light
  color += fresnel * vec3(0.85, 0.82, 0.78) * 0.3;
  
  // Soft alpha based on fresnel for ethereal look
  float alpha = mix(0.15, 0.5, fresnel);
  
  gl_FragColor = vec4(color, alpha);
}
