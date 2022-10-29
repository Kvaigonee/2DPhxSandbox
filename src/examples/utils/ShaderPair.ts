import {createShader} from "./Shader";

/**
 *
 */
export default class ShaderPair {
    /**
     *
     * @private
     */
    private static instance : ShaderPair | null = null;

    /**
     *
     * @private
     */
    private gl : WebGL2RenderingContext;

    /**
     *
     * @private
     */
    private vertexShader : WebGLShader | null = null;

    /**
     *
     * @private
     */
    private fragmentShader : WebGLShader | null = null;

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
    public static createInstance(context: WebGL2RenderingContext) : ShaderPair {
        if (this.instance === null) {
            this.instance = new ShaderPair(context);
        }
        return this.instance
    }

    /**
     *
     * @param vsSource
     * @param fsSource
     */
    public setShaderPair(vsSource: string,
                        fsSource: string) : void {
        this.vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vsSource);
        this.fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fsSource);
    }

    /**
     *
     */
    public getShaderPair() : {vertexShader: WebGLShader, fragmentShader: WebGLShader} {
        if (!this.vertexShader || !this.fragmentShader) throw new Error("Shader pair was not created!")
        return {
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        }
    }
}


