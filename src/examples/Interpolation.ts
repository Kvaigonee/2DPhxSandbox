import ShaderProgram from "../ShaderProgram";
import ShaderPair from "../ShaderPair";
import {GLBuffer} from "../GLBuffer";
import Context from "../gl/GLContext";
import AbstractExample from "./AbstractExample";

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
    
    out vec3 v_Color;
    
    void main() {
        v_Color = a_vertexColor;
        gl_Position = vec4(a_position, 1, 1);
    }
`;

/**
 *
 * @constructor
 */
export class Interpolation extends AbstractExample {

    constructor() {
        super();
        this.init();
    }

    public destroy() {
        document.body.removeChild(this.canvasElement);
    }

    private init() {
        const webGLContext = new Context(this.canvasElement);

        let gl = webGLContext.getContextProtected();

        const shaderPair = ShaderPair.createInstance(gl);
        shaderPair.setShaderPair(vertexShaderSource, fragmentShaderSource)

        const { vertexShader, fragmentShader } = shaderPair.getShaderPair();

        const program = ShaderProgram.createInstance(gl).updateProgram(vertexShader, fragmentShader);
        const buffer = new GLBuffer(gl);

        buffer.setData(new Float32Array([
            -0.5, -0.5,
            1, 0, 0,
            -0.5, 0.5,
            0, 1, 0,
            0.7, -0.5,
            0, 0, 1
        ]));

        buffer.setShaderAttribute(program, {
            name: "a_position",
            size : 2,
            type : gl.FLOAT,
            normalize : false,
            stride : 20,
            offset : 0
        })

        buffer.setShaderAttribute(program, {
            name: "a_vertexColor",
            size : 3,
            type : gl.FLOAT,
            normalize : false,
            stride : 20,
            offset : 8
        })

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
