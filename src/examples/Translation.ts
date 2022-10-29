import Context, {CANVAS_HEIGHT, CANVAS_WIDTH} from "./utils/Context";
import ShaderProgram from "./utils/ShaderProgram";
import {Buffer} from "./utils/Buffer";
import ShaderPair from "./utils/ShaderPair";

export function Translation() {
    const fragmentShaderSource = `#version 300 es

    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    out vec4 outColor;
    
    void main() {
      outColor = vec4(1, 0, 0, 1);
    }
    `;

    const vertexShaderSource = `#version 300 es
    
    in vec2 a_position;
    uniform vec2 u_translation;
    
    void main() {
        vec2 move = a_position + u_translation;
        gl_Position = vec4(move, 1, 1);
    }
    `;

    let gl = Context.createInstance().getWebGLContext();
    const shaderPair = ShaderPair.createInstance(gl);
    shaderPair.setShaderPair(vertexShaderSource, fragmentShaderSource)

    const { vertexShader, fragmentShader } = shaderPair.getShaderPair();

    let program = ShaderProgram.createInstance(gl).updateProgram(vertexShader, fragmentShader);

    const buffer = new Buffer(gl);

    buffer.setData(new Float32Array([
        -0.5, -0.5,
        -0.5, 0.5,
        0.7, -0.5
    ]));

    buffer.setShaderAttribute(program, {
        name: "a_position",
        size : 2,
        type : gl.FLOAT,
        normalize : false,
        stride : 0,
        offset : 0
    });

    let translationLocation = gl.getUniformLocation(program, "u_translation");

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    const draw = (translation: [number, number]) => {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2fv(translationLocation, normalize(translation));

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const inputX = document.createElement("input");
    const inputY = document.createElement("input");
    let x = 0, y = 0;

    inputX.type = "range";
    inputX.min = "-200";
    inputX.max = "200";
    inputX.value = x.toString();

    inputY.type = "range";
    inputY.min = "-200";
    inputY.max = "200";
    inputY.value = y.toString();

    document.body.appendChild(inputX);
    document.body.appendChild(inputY);

    inputX.oninput = () => {
        x = +inputX.value
        draw([x, y]);
    };

    inputY.oninput = () => {
        y = +inputY.value;
        draw([x, y]);
    };

    draw([x, y]);
}

const button = document.createElement("button");
button.addEventListener("click", Translation);
button.innerText = "Translation example";

document.body.appendChild(button);


/**
 * Нормализуем координаты
 * @param vertex
 */
function normalize(vertex: [number, number]) {
    return [vertex[0] * (2 / CANVAS_WIDTH), vertex[1] * (2 / CANVAS_HEIGHT)]
}

