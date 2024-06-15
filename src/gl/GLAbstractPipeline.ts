import GLContext from "./GLContext";
import GLShaderProgram from "./GLShaderProgram";
import GLShader, {GLShaderTypes} from "./GLShader";


/**
 * Pipeline будет объединять шейдерную программу
 * и ее данные
 */
export default abstract class GLAbstractPipeline {

    /**
     *
     * @protected
     */
    protected abstract glProgram : GLShaderProgram;

    /**
     *
     */
    public abstract vertexShaderSource : string;

    /**
     *
     */
    public abstract fragmentShaderSource : string;

    /**
     *
     * @private
     */
    protected glContext : GLContext;

    /**
     *
     * @param glContext
     * @protected
     */
    protected constructor(glContext : GLContext) {
        this.glContext = glContext;
    }

    /**
     *
     */
    public abstract render() : void;

    /**
     *
     * @protected
     */
    protected createProgram() : GLShaderProgram {
        const glContext = this.glContext;
        const vertexShader = new GLShader(glContext, this.vertexShaderSource, GLShaderTypes.VERTEX);
        const fragmentShader = new GLShader(glContext, this.fragmentShaderSource, GLShaderTypes.FRAGMENT);

        return new GLShaderProgram(glContext, vertexShader, fragmentShader);
    }
}