uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
attribute float aScale;
attribute float aSpeed;
attribute float aOffset;
varying float vAlpha;
varying float vScale;

void main() {
  vec3 pos = position;
  
  // Gentle floating motion
  pos.y += sin(uTime * aSpeed * 0.3 + aOffset) * 0.4;
  pos.x += cos(uTime * aSpeed * 0.2 + aOffset * 1.7) * 0.3;
  pos.z += sin(uTime * aSpeed * 0.15 + aOffset * 2.3) * 0.2;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  vec4 viewPos = viewMatrix * modelPos;
  vec4 projPos = projectionMatrix * viewPos;
  gl_Position = projPos;

  // Size attenuation
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPos.z);
  
  // Fade based on distance and position
  vAlpha = smoothstep(0.0, 0.3, aScale) * (0.3 + 0.7 * sin(uTime * aSpeed * 0.5 + aOffset) * 0.5 + 0.5);
  vScale = aScale;
}
