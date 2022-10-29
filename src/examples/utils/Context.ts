const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

/**
 *
 */
export default class Context {
    /**
     *
     * @private
     */
    private gl : WebGL2RenderingContext | null = null;

    /**
     *
     * @private
     */
    private static instance : Context | null = null;

    /**
     *
     * @private
     */
    private constructor() {
    }

    /**
     *
     */
    public static createInstance() : Context {
        if (this.instance === null) {
            this.instance = new Context();
        }
        return this.instance
    }

    /**
     *
     */
    public getWebGLContext() : WebGL2RenderingContext {
        if (this.gl !== null) return this.gl;

        let canvas = document.querySelector("canvas");
        canvas = canvas !== null ? canvas : document.createElement("canvas");

        this.gl = canvas.getContext("webgl2");
        if (!this.gl) throw `Context is ${this.gl}`;

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        document.body.appendChild(canvas);

        return this.gl;
    }
}

/**
 *
 */
export {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
}