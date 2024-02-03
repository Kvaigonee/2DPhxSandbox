import EventEmitter from "../EventEmmiter";
import IGLObjectEventMap from "../IGLObjectEventMap";

/**
 *
 * @param gl
 * @param type
 * @param source
 */
export default class GLShader extends EventEmitter<IGLObjectEventMap>{
    /**
     *
     * @private
     */
    public readonly type: GLShaderTypes;

    /**
     *
     * @private
     */
    private gl : WebGL2RenderingContext;


    /**
     *
     * @private
     */
    private source : string;

    /**
     *
     * @private
     */
    private glShader : WebGLShader | null = null;

    /**
     *
     * @private
     */
    private valid : boolean = false;

    /**
     *
     * @param context
     * @param source
     * @param type
     */
    public constructor(context : WebGL2RenderingContext,
                       source : string,
                       type : GLShaderTypes) {
        super();
        this.gl = context;
        this.type = type;
        this.source = source;

        this.validate();
    }

    /**
     *
     */
    getGlShader() {
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
     * @param source
     */
    setSource(source : string) {
        if (source === this.source) return;

        this.source = source;
        this.valid = false;

        this.validate();
    }

    /**
     *
     * @private
     */
    private validate() {
        if (this.valid) return;

        const gl = this.gl;
        const type = this.type;
        const shader = gl.createShader(type);

        if (!shader) {
            console.warn("Unable to create shader with type " + type);
            this.valid = false;
            this.emitEvent("invalid", {});
            return;
        }

        gl.shaderSource(shader, this.source);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            this.valid = true;
            this.glShader = shader;

            this.emitEvent("valid", {});
            return;
        }

        gl.deleteShader(shader);
        console.warn("Unable to create shader with type " + type);

        this.emitEvent("invalid", {});
    }


}


export enum GLShaderTypes {
    VERTEX = WebGL2RenderingContext["VERTEX_SHADER"],
    FRAGMENT = WebGL2RenderingContext["FRAGMENT_SHADER"]
}
