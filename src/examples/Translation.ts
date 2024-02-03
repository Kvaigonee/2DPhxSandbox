import ShaderProgram from "../ShaderProgram";
import {GLBuffer} from "../GLBuffer";
import ShaderPair from "../ShaderPair";
import GLContext from "../gl/GLContext";
import AbstractExample from "./AbstractExample";


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



/**
 * Пример перемещения вершин используя векторное преобразование
 * @constructor
 */
export class Translation extends AbstractExample {

    public constructor() {
        super();

        this.init();
    }

    public destroy() {
        document.body.removeChild(this.canvasElement);
    }

    private init() {
        const glContext = new GLContext(this.canvasElement);
        const gl = glContext.getContextProtected();

        const shaderPair = ShaderPair.createInstance(gl);
        shaderPair.setShaderPair(vertexShaderSource, fragmentShaderSource)

        const { vertexShader, fragmentShader } = shaderPair.getShaderPair();

        let program = ShaderProgram.createInstance(gl).updateProgram(vertexShader, fragmentShader);

        //Единажды устанавливаем данные в буффер, далее они будут изменяться только внутри шейдерной программы
        const buffer = new GLBuffer(gl);

        buffer.setData(new Float32Array([
            -0.5, -0.5,
            -0.5, 0.5,
            0.7, -0.5
        ]));

        buffer.setShaderAttribute(program, {
            name: "a_position",
            size: 2,
            type: gl.FLOAT,
            normalize: false,
            stride: 0,
            offset: 0
        });

        let translationLocation = gl.getUniformLocation(program, "u_translation");

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.useProgram(program);

        //Надо учесть, что при каждом вызове отрисовки мы вновь начинаем работу с заранее
        //установленными данными, т.е. вершины будут в исходных координатах
        const draw = (translation: [number, number]) => {
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform2fv(translationLocation, normalize(translation));

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        const inputX = document.createElement("input");
        const inputY = document.createElement("input");

        inputX.type = "range";
        inputY.type = "range"

        let x = 0, y = 0;

        inputX.oninput = () => {
            x = +inputX.value;
            draw([x, y]);
        };

        inputY.oninput = () => {
            y = +inputY.value;
            draw([x, y]);
        };

        draw([x, y]);
    }
}

/**
 * Нормализуем координаты
 * @param vertex
 */
function normalize(vertex: [number, number]) {
    return [vertex[0] * (2 / 1280), vertex[1] * (2 / 720)]
}

