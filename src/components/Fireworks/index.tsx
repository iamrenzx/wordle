import { useEffect, useRef } from "react";

export const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const vs = `#version 300 es
    in vec2 a;
    void main(){ gl_Position=vec4(a,0,1); }`;

    const fs = `#version 300 es
    precision highp float;
    uniform vec3 iResolution;
    uniform float iTime;
    out vec4 fragColor;

    #define rad(x) radians(x)
    #define np 50.
    #define snp 40.

    vec2 N22(vec2 p){
        vec3 a = fract(p.xyx*vec3(123.34, 234.34, 345.65));
        a += dot(a, a+34.45);
        return fract(vec2(a.x*a.y, a.y*a.z));
    }

    vec3 burst(vec2 st, vec2 pos, float r, vec3 col) {
        st -= pos;
        r *= 0.6 * r;
        return (r/dot(st, st)) * col * 0.6;
    }

    vec2 get_pos(vec2 u, vec2 a, vec2 p0, float t, float ang){
        ang = rad(ang);
        return p0 + vec2(u.x*cos(ang), u.y*sin(ang))*t + 0.5*a*t*t;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord ){
        vec2 uv = (2.*fragCoord-iResolution.xy)/iResolution.y;
        vec3 p1 = vec3(0.0);
        float t = mod(iTime, 10.);
        vec2 a = vec2(0.0, -9.8);
        
        for (float i=0.; i<np; i++){
            vec2 rand = N22(vec2(i));
            vec2 ip = vec2(sin(15.*rand.x), -1.+0.04);
            vec2 u = vec2(sin(5.*rand.x), 5.+sin(4.*rand.y));
            float t1 = t-i/5.;
            vec2 s = get_pos(u, a, ip, t1, 75.0);
            // Valentine Pink/Red Palette
            vec3 pcol = vec3(1.0, rand.y * 0.5, 0.6); 

            if (t1 > 0.0) p1 += burst(uv, s, 0.04, pcol);
        }
        
        fragColor = vec4(p1 + vec3(0.05, 0.0, 0.1), 1.0);
    }
    void main(){ mainImage(fragColor, gl_FragCoord.xy); }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const iRes = gl.getUniformLocation(prog, "iResolution");
    const iTime = gl.getUniformLocation(prog, "iTime");

    const render = (time: number) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(iRes, canvas.width, canvas.height, 1.0);
      gl.uniform1f(iTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
  );
};
