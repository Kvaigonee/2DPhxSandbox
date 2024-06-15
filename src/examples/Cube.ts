import GLAbstractPipeline from "../gl/GLAbstractPipeline";
import GLContext from "../gl/GLContext";
import {GLBuffer} from "../gl/GLBuffer";
import GLTexture from "../gl/GLTexture";
import {mat4} from "gl-matrix";
import Camera from "../gl/Camera";
import AbstractExample from "./AbstractExample";
import GLShaderProgram from "../gl/GLShaderProgram";


class GLTexturedObjectPipeline extends GLAbstractPipeline {

    public readonly vertexShaderSource = `#version 300 es
        precision highp float;
        
        in vec4 a_position;
        in vec2 a_uv;
        
        uniform mat4 u_matrix;
        
        out vec2 v_uv;
        
        void main() {
          gl_Position = u_matrix * a_position;
          v_uv = a_uv;
        }
    `;

    public readonly fragmentShaderSource = `#version 300 es
        precision highp float;
        
        // Passed in from the vertex shader.
        in vec2 v_uv;
        
        // The texture
        uniform sampler2D u_texture;
        
        // we need to declare an output for the fragment shader
        out vec4 outColor;
        
        void main() {
          outColor = texture(u_texture, v_uv);
        }
    `;

    /**
     *
     * @private
     */
    private geometryBuffer : GLBuffer;

    /**
     *
     * @private
     */
    private uvCoordinatesBuffer : GLBuffer;

    /**
     *
     * @private
     */
    private texture : GLTexture;

    /**
     *
     * @private
     */
    private countDrawCalls : number;

    /**
     *
     * @private
     */
    private camera : Camera;

    /**
     *
     * @private
     */
    private rotationY = 0;

    /**
     *
     * @protected
     */
    protected glProgram : GLShaderProgram;

    /**
     *
     */
    public translate : [number, number, number] = [0, 0, 0];

    /**
     *
     */
    public constructor(glContext : GLContext, texture: GLTexture, camera: Camera) {
        super(glContext);
        this.glProgram = this.createProgram();

        this.geometryBuffer = new GLBuffer(glContext);
        this.geometryBuffer.setShaderAttribute(this.glProgram.getProgram(), {
            name: "a_position",
            size : 3,
            type : glContext.getContext().FLOAT,
            normalize : false,
            stride : 0,
            offset : 0
        });

        const cubeGeometry = this.createCubeGeometry();
        this.geometryBuffer.setData(this.createCubeGeometry());

        this.countDrawCalls = cubeGeometry.length / 3;

        this.uvCoordinatesBuffer = new GLBuffer(glContext);
        this.uvCoordinatesBuffer.setShaderAttribute(this.glProgram.getProgram(), {
            name: "a_uv",
            size : 2,
            type : glContext.getContext().FLOAT,
            normalize : false,
            stride : 0,
            offset : 0
        });

        this.uvCoordinatesBuffer.setData(this.createUVCoordinates());

        this.texture = texture;
        this.camera = camera;
    }

    /**
     *
     */
    public render() {
        const translate = this.translate;
        const gl = this.glContext.getContext();
        const canvas = gl.canvas as HTMLCanvasElement;

        this.rotationY = (this.rotationY + 0.3) % 360;

        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        const program = this.glProgram.getProgram();
        gl.useProgram(program);

        this.texture.bind();

        let viewProjectionMatrix = this.camera.getProjectionMatrix();
        viewProjectionMatrix = mat4.multiply(mat4.create(), viewProjectionMatrix, this.camera.getInvertedMatrix());

        viewProjectionMatrix = mat4.translate(mat4.create(), viewProjectionMatrix, translate);
        viewProjectionMatrix = mat4.rotateY(mat4.create(), viewProjectionMatrix, Math.PI / 180 * this.rotationY);
        viewProjectionMatrix = mat4.rotateX(mat4.create(), viewProjectionMatrix, Math.PI / 180 * (this.rotationY / 2));

      //  viewProjectionMatrix = mat4.multiply(mat4.create(), viewProjectionMatrix, this.camera.getInvertedMatrix());

        const matrixLocation = gl.getUniformLocation(program, "u_matrix");
        gl.uniformMatrix4fv(matrixLocation, false, viewProjectionMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, this.countDrawCalls);
    }

    /**
     *
     * @private
     */
    private createCubeGeometry() {
        return new Float32Array([
            -0.5, -0.5,  -0.5,
            -0.5,  0.5,  -0.5,
            0.5, -0.5,  -0.5,
            -0.5,  0.5,  -0.5,
            0.5,  0.5,  -0.5,
            0.5, -0.5,  -0.5,

            -0.5, -0.5,   0.5,
            0.5, -0.5,   0.5,
            -0.5,  0.5,   0.5,
            -0.5,  0.5,   0.5,
            0.5, -0.5,   0.5,
            0.5,  0.5,   0.5,

            -0.5,   0.5, -0.5,
            -0.5,   0.5,  0.5,
            0.5,   0.5, -0.5,
            -0.5,   0.5,  0.5,
            0.5,   0.5,  0.5,
            0.5,   0.5, -0.5,

            -0.5,  -0.5, -0.5,
            0.5,  -0.5, -0.5,
            -0.5,  -0.5,  0.5,
            -0.5,  -0.5,  0.5,
            0.5,  -0.5, -0.5,
            0.5,  -0.5,  0.5,

            -0.5,  -0.5, -0.5,
            -0.5,  -0.5,  0.5,
            -0.5,   0.5, -0.5,
            -0.5,  -0.5,  0.5,
            -0.5,   0.5,  0.5,
            -0.5,   0.5, -0.5,

            0.5,  -0.5, -0.5,
            0.5,   0.5, -0.5,
            0.5,  -0.5,  0.5,
            0.5,  -0.5,  0.5,
            0.5,   0.5, -0.5,
            0.5,   0.5,  0.5,
        ]);
    }

    private createUVCoordinates() {
        return new Float32Array([
            // select the top left image
            0   , 0  ,
            0   , 0.5,
            0.25, 0  ,
            0   , 0.5,
            0.25, 0.5,
            0.25, 0  ,
            // select the top middle image
            0.25, 0  ,
            0.5 , 0  ,
            0.25, 0.5,
            0.25, 0.5,
            0.5 , 0  ,
            0.5 , 0.5,
            // select to top right image
            0.5 , 0  ,
            0.5 , 0.5,
            0.75, 0  ,
            0.5 , 0.5,
            0.75, 0.5,
            0.75, 0  ,
            // select the bottom left image
            0   , 0.5,
            0.25, 0.5,
            0   , 1  ,
            0   , 1  ,
            0.25, 0.5,
            0.25, 1  ,
            // select the bottom middle image
            0.25, 0.5,
            0.25, 1  ,
            0.5 , 0.5,
            0.25, 1  ,
            0.5 , 1  ,
            0.5 , 0.5,
            // select the bottom right image
            0.5 , 0.5,
            0.75, 0.5,
            0.5 , 1  ,
            0.5 , 1  ,
            0.75, 0.5,
            0.75, 1  ,
        ])
    }
}


export default class CubeExample extends AbstractExample {

    public constructor(rootElement: HTMLElement) {
        super(rootElement);
        this.init();
    }

    public destroy() {
        this.rootElement.removeChild(this.canvasElement);
    }

    private init() {
        const glContext = new GLContext(this.canvasElement);

        const camera = new Camera();
        console.warn(camera);

        camera.translate([0, 0, 5]);

        const pipeline = new GLTexturedObjectPipeline(glContext, new GLTexture(glContext,"src/assets/images/Earth.jpg"), camera);
        pipeline.translate = [0, -1, -10];

        const pipeline2 = new GLTexturedObjectPipeline(glContext, new GLTexture(glContext), camera);
        pipeline2.translate = [-2, -1, -6];

        const pipeline3 = new GLTexturedObjectPipeline(glContext, new GLTexture(glContext), camera);
        pipeline3.translate = [-1, -1, -8];

        setInterval(() => {
            pipeline.render();
            pipeline2.render();
            pipeline3.render();
        }, 1000 / 60);
    }
}
