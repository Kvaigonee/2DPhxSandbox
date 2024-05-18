import GLContext from "./GLContext";

/**
 *
 * @param gl
 * @param type
 * @param source
 */
export default class GLShader {
    /**
     *
     * @private
     */
    public readonly type: GLShaderTypes;

    /**
     *
     * @private
     */
    private gl : GLContext;


    /**
     *
     * @private
     */
    private readonly source : string;

    /**
     *
     * @private
     */
    private readonly glShader : WebGLShader;

    /**
     *
     * @param context
     * @param source
     * @param type
     */
    public constructor(context : GLContext,
                       source : string,
                       type : GLShaderTypes) {
        this.gl = context;
        this.type = type;
        this.source = source;

        this.glShader = this.createShader();
        this.compileShader();
    }

    /**
     *
     */
    getGlShader() : WebGLShader {
        return this.glShader;
    }

    /**
     *
     */
    getSource() {
        return this.source;
    }

    /**
     *
     * @private
     */
    private createShader() {
        const gl = this.gl.getContext();
        const type = this.type;
        const shader = gl.createShader(type);

        if (!shader) {
            throw new Error("Creating WebGLShader error, shader type: " + type);
        }

        return shader;
    }

    private compileShader() {
        const gl = this.gl.getContext();
        const shader = this.glShader;

        gl.shaderSource(shader, this.source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error("Compile WebGLShader error, shader type: " + this.type);
        }
    }
}


export enum GLShaderTypes {
    VERTEX = WebGL2RenderingContext["VERTEX_SHADER"],
    FRAGMENT = WebGL2RenderingContext["FRAGMENT_SHADER"]
}
