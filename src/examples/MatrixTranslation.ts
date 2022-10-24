import {getWebGLContext} from "./utils/Context";
import {createShader} from "./utils/Shader";
import {createProgram} from "./utils/ShaderProgram";
import {Interpolation} from "./Interpolation";

export function MatrixTranslation() {
    const fragmentShaderSource = `#version 300 es

    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    in vec3 v_Color;
    out vec4 outColor;
    
    void main() {
      outColor = vec4(v_Color, 1);
    }
    `;

    const vertexShaderSource = `#version 300 es
    
    in vec2 a_position;
    in vec3 a_vertexColor;
    uniform vec2 a_translation;
    
    out vec3 v_Color;
    
    void main() {
        v_Color = a_vertexColor;
        vec2 move = a_position * a_translation;
        
        gl_Position = vec4(move, 1, 1);
    }
    `;

    let gl = getWebGLContext();

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -0.5, -0.5,
        1, 0, 0,
        -0.5, 0.5,
        0, 1, 0,
        0.7, -0.5,
        0, 0, 1
    ]), gl.STATIC_DRAW);

    let glAttributePositionPtr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(glAttributePositionPtr);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 20;
    let offset = 0;
    gl.vertexAttribPointer(
        glAttributePositionPtr, size, type, normalize, stride, offset);

    let glAttributePositionPtr2 = gl.getAttribLocation(program, "a_vertexColor");
    gl.enableVertexAttribArray(glAttributePositionPtr2);

    size = 3;
    type = gl.FLOAT;
    normalize = false;
    stride = 20;
    offset = 0;
    gl.vertexAttribPointer(
        glAttributePositionPtr2, size, type, normalize, stride, offset);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    let glTranslationAttrLoc = gl.getAttribLocation(program, "a_translation");

    const draw = (translation: [number, number]) => {
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 1);
    }

    console.log(draw);

/*    function repaint() {

        draw(1);
        requestAnimationFrame(repaint);
    }
    repaint();*/
}

const button = document.createElement("button");

button.addEventListener("click", MatrixTranslation);
button.innerText = "Matrix translation example";

document.body.appendChild(button);

function normalize(vertex: [number, number]) {

}

