// shader.glsl
//#vertex
attribute vec3 aNormal;
attribute vec3 aPosition;
attribute vec2 aUV;

uniform mat4 uMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;

varying vec3 vNormal;
varying vec2 vUV;
     
void main() {
	vUV = aUV;
	vNormal = uNormalMatrix * normalize(aNormal);
	gl_PointSize = 3.0;
	gl_Position = uProjection * uMatrix * vec4(aPosition, 1.0);
}

//#fragment
#ifdef GL_ES
precision highp float;
#endif
               
varying vec3 vNormal;
varying vec2 vUV;

uniform sampler2D uTexture;
uniform sampler2D uVideoTexture;
           
void main() {

	vec3 color = texture2D(uTexture, vUV).rgb;

	vec2 uv = vUV;
	uv.y = 0.114 + vUV.y * 0.886;
	vec3 videoColor = texture2D(uVideoTexture, uv).rgb;


	gl_FragColor = vec4((color + videoColor * 0.9) * 0.66, 1.0);
}