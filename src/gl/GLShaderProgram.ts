import GLShader from "./GLShader";
import EventEmitter from "../utils/EventEmmiter";
import IValidatedEventMap from "../IValidatedEventMap";

/**
 *
 */
export default class GLShaderProgram extends EventEmitter<IValidatedEventMap>{
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
    private vertexShader : GLShader;

    /**
     *
     * @private
     */
    private fragmentShader : GLShader;

    /**
     *
     * @private
     */
    private valid = false;

    /**
     *
     * @private
     */
    public constructor(context: WebGL2RenderingContext,
                        vertexShader : GLShader,
                        fragmentShader : GLShader) {
        super();

        this.gl = context;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.validate();
    }

    /**
     *
     */
    public destroy() {
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
     * @param shader
     */
    public setVertexShader(shader : GLShader) {
        this.vertexShader = shader;
        this.valid = false;
        this.validate();
    }

    /**
     *
     * @param shader
     */
    public setFragmentShader(shader : GLShader) {
        this.fragmentShader = shader;
        this.valid = false;
        this.validate();
    }

    /**
     *
     * @private
     */
    private validate() {
        if (this.valid) return;

        const program = this.gl.createProgram();
        if (program === null)  {
            this.valid = false;
            console.warn("Unable to create WebGL Program!");
            this.emitEvent("invalid", {});
            return;
        }

        this.program = program;

        this.gl.attachShader(this.program, this.vertexShader.getGlShader());
        this.gl.attachShader(this.program, this.fragmentShader.getGlShader());
        this.gl.linkProgram(this.program);

        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            this.valid = true;
            this.emitEvent("valid", {});

            return;
        }

        this.valid = false;
        console.warn("Program error!");
    }

}

