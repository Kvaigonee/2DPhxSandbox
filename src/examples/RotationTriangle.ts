import GLShaderProgram from "../gl/GLShaderProgram";
import {GLBuffer} from "../gl/GLBuffer";
import GLContext from "../gl/GLContext";
import AbstractExample from "./AbstractExample";
import GLShader, {GLShaderTypes} from "../gl/GLShader";
import { mat4 } from "gl-matrix";


const vertexShaderSource = `#version 300 es
    precision highp float;
    
    in vec4 a_position;
    in vec3 a_color;
    
    uniform mat4 u_matrix;
    
    out vec3 v_color;
    
    void main() {
      gl_Position = u_matrix * a_position;
    
      v_color = a_color;
    }
`;

const fragmentShaderSource = `#version 300 es
    precision highp float;
    
    in vec3 v_color;
    out vec4 outColor;
    
    void main() {
      outColor = vec4(v_color, 1.0);
    }
`;


/**
 * Пример перемещения вершин используя векторное преобразование
 * @constructor
 */
export class RotationTriangle extends AbstractExample {

    private inputFov = document.createElement("input");

    public constructor(rootElement: HTMLElement) {
        super(rootElement);

        this.init();
    }

    public destroy() {
        this.rootElement.removeChild(this.canvasElement);
        this.rootElement.removeChild(this.inputFov);
    }

    private init() {
        const glContext = new GLContext(this.canvasElement);
        const gl = glContext.getContext();

        const vertexShader = new GLShader(glContext, vertexShaderSource, GLShaderTypes.VERTEX);
        const fragmentShader = new GLShader(glContext, fragmentShaderSource, GLShaderTypes.FRAGMENT);

        const glProgram = new GLShaderProgram(glContext, vertexShader, fragmentShader);
        const program = glProgram.getProgram();

        if (!program) {
            throw new Error("Program is null!");
        }

        const buffer = new GLBuffer(glContext);

        buffer.setData(new Float32Array([
            -0.5, -0.5, 1.0, 1.0,
            1, 0.0, 0.0,

            -0.5, 0.5, 1.0, 1.0,
            0.0, 1.0, 0.0,

             0.7, -0.5, 1.0, 1.0,
            0.0, 0.0, 1.0,
        ]));

        buffer.setShaderAttribute(program, {
            name: "a_position",
            size: 4,
            type: gl.FLOAT,
            normalize: false,
            stride: 28,
            offset: 0
        });

        buffer.setShaderAttribute(program, {
            name: "a_color",
            size: 3,
            type: gl.FLOAT,
            normalize: false,
            stride: 28,
            offset: 16
        });

        let matrixLocation = gl.getUniformLocation(program, "u_matrix");

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.useProgram(program);

        let perspectiveMatrix = mat4.perspectiveNO(
            mat4.create(),
            Math.PI / 4,
            this.canvasElement.clientWidth / this.canvasElement.clientHeight,
            1,
            200
        );

        perspectiveMatrix = mat4.translate(mat4.create(), perspectiveMatrix, [0, 0, -10]);

        const draw = (rotationX : number) => {
            let matrix = perspectiveMatrix;

            matrix = mat4.rotateZ(mat4.create(), matrix, rotationX);
            matrix = mat4.rotateY(mat4.create(), matrix, rotationX);
            matrix = mat4.rotateX(mat4.create(), matrix, rotationX);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniformMatrix4fv(matrixLocation, false, matrix);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        const degreeToRadians = Math.PI / 180;

        this.rootElement.appendChild(this.inputFov);

        this.inputFov.type = "range";
        this.inputFov.max = "180";
        this.inputFov.min = "0";

        this.inputFov.value = "90";

        this.inputFov.oninput = () => {
            console.log("FOV set: ", this.inputFov.value);

            perspectiveMatrix = mat4.perspectiveNO(
                mat4.create(),
                +this.inputFov.value * degreeToRadians,
                this.canvasElement.clientWidth / this.canvasElement.clientHeight,
                1,
                200
            );

            perspectiveMatrix = mat4.translate(mat4.create(), perspectiveMatrix, [0, 0, -10]);
        }

        const step = 1;
        let angle = 0;

        setInterval(() => {
            angle = (angle + step) % 360;

            draw(angle * degreeToRadians);
        }, 1000 / 60);

        draw(angle * degreeToRadians);
    }
}
