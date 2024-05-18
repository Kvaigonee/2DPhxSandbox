import GLShader from "./GLShader";
import GLContext from "./GLContext";

/**
 *
 */
export default class GLShaderProgram {
    /**
     *
     * @private
     */
    private gl : GLContext;

    /**
     *
     * @private
     */
    private readonly program : WebGLProgram;

    /**
     *
     * @private
     */
    private readonly vertexShader : GLShader;

    /**
     *
     * @private
     */
    private readonly fragmentShader : GLShader;

    /**
     *
     * @private
     */
    public constructor(context: GLContext,
                       vertexShader : GLShader,
                       fragmentShader : GLShader) {
        this.gl = context;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.program = this.createProgram();
        this.linkProgram();
    }

    /**
     *
     */
    public getProgram() {
        return this.program;
    }

    /**
     *
     */
    public getVertexShader() {
        return this.vertexShader;
    }

    /**
     *
     */
    public getFragmentShader() {
        return this.fragmentShader;
    }


    /**
     *
     * @private
     */
    private createProgram() {
        const program = this.gl.getContext().createProgram();
        if (program === null)  {
            throw new Error("Create WebGLProgram error!");
        }

        return program;
    }

    /**
     *
     * @private
     */
    private linkProgram() {
        const program = this.program;
        const gl = this.gl.getContext();

        gl.attachShader(program, this.vertexShader.getGlShader());
        gl.attachShader(program, this.fragmentShader.getGlShader());
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("Link WebGLProgram error!");
        }
    }
}

