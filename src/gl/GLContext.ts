/**
 *
 */
export default class GLContext {
    /**
     *
     * @private
     */
    private readonly gl : WebGL2RenderingContext;

    /**
     *
     * @private
     */
    private readonly canvas : HTMLCanvasElement;

    /**
     *
     * @private
     */
    private readonly webGLContextAttributes ?: WebGLContextAttributes;

    /**
     *
     * @private
     */
    public constructor(canvas : HTMLCanvasElement,
                       webGLContextAttributes ?: WebGLContextAttributes) {
        this.canvas = canvas;
        this.webGLContextAttributes = webGLContextAttributes;
        this.gl = this.createContext();
    }

    /**
     *
     */
    public getContext() {
        return this.gl;
    }

    /**
     *
     */
    public getCanvas() {
        return this.canvas;
    }

    /**
     *
     */
    public getWebGLContextAttributes() {
        return this.webGLContextAttributes;
    }

    /**
     *
     */
    private createContext() {
        const gl = this.canvas.getContext("webgl2", this.webGLContextAttributes);
        if (!gl) {
            throw new Error("Getting webgl2 context error!");
        }

        return gl;
    }
}
