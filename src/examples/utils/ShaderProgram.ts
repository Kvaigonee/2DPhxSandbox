/**
 *
 */
export default class ShaderProgram {
    /**
     *
     * @private
     */
    private static instance : ShaderProgram | null = null;

    /**
     *
     * @private
     */
    private gl : WebGL2RenderingContext;

    /**
     *
     * @private
     */
    private program : WebGLProgram | null = null;

    /**
     *
     * @private
     */
    private constructor(context: WebGL2RenderingContext) {
        this.gl = context;
    }

    /**
     *
     */
    public static createInstance(gl: WebGL2RenderingContext) : ShaderProgram {
        if (this.instance === null) {
            this.instance = new ShaderProgram(gl);
        }
        return this.instance
    }

    /**
     *
     */
    public updateProgram(vertexShader: WebGLShader,
                         fragmentShader: WebGLShader) : WebGLProgram {
        let program = this.gl.createProgram();
        if (program === null) throw new Error("Unable to create WebGL Program!");

        this.program = program;

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) return program;

        throw new Error("Program error!");
    }

    /**
     *
     */
    public removeProgram() {
        this.gl.deleteProgram(this.program);
        this.program = null;
    }
}

