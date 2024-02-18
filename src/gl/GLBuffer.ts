import EventEmitter from "../utils/EventEmmiter";
import IValidatedEventMap from "../IValidatedEventMap";
import GLContext from "./GLContext";

/**
 *
 */
export class GLBuffer extends EventEmitter<IValidatedEventMap> {
    /**
     *
     */
    private context : GLContext;

    /**
     *
     */
    private buffer : WebGLBuffer | null = null;

    /**
     *
     */
    private valid = false;

    /**
     *
     * @param context
     */
    public constructor(context : GLContext) {
        super();

        this.context = context;
        this.validate();
    }

    public isValid() {
        return this.valid;
    }

    /**
     *
     */
    public getBufferObject() : WebGLBuffer {
        if (this.buffer === null) {
            throw new Error("Buffer is null");
        }

        return this.buffer;
    }

    /**
     *
     * @param data
     */
    public setData(data: BufferSource) {
        const gl = this.context.getContextProtected();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    /**
     *
     */
    public setShaderAttribute(program: WebGLProgram, description: ShaderAttributeDescription) {
        if (this.buffer === null) {
            throw new Error("Buffer is null!");
        }

        const { name, size, type, normalize, stride, offset } = description;

        const gl = this.context.getContextProtected();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        let attribPosition = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(attribPosition);

        gl.vertexAttribPointer(
            attribPosition, size, type, normalize, stride, offset);
    }

    /**
     *
     * @private
     */
    private validate() {
        if (this.valid) return;

        let buffer = this.context.getContextProtected().createBuffer();
        if (buffer === null) throw new Error("GLBuffer was not created!");

        this.buffer = buffer;
        this.valid = true;
    }
}

// vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;
export type ShaderAttributeDescription = {
    name: string
    size : number;
    type : GLenum;
    normalize : GLboolean;
    stride : GLsizei;
    offset : GLintptr;
}
