import GLContext from "./GLContext";

/**
 *
 */
export class GLBuffer {
    /**
     *
     */
    private context : GLContext;

    /**
     *
     */
    private readonly buffer : WebGLBuffer;

    /**
     *
     * @private
     */
    private data : BufferSource | null = null;

    /**
     *
     * @param context
     */
    public constructor(context : GLContext) {
        this.context = context;
        this.buffer = this.createBuffer();
    }

    /**
     *
     */
    public getBufferObject() : WebGLBuffer {
        return this.buffer;
    }

    /**
     *
     */
    public getData(): BufferSource | null {
        return this.data;
    }

    /**
     *
     */
    public getSize() : number {
        if (this.data === null) return 0;
        return this.data.byteLength;
    }

    /**
     *
     * @param data
     */
    public setData(data: BufferSource) {
        const gl = this.context.getContext();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        this.data = data;
    }

    /**
     *
     */
    public setShaderAttribute(program: WebGLProgram, description: GLShaderAttributeDescription) {
        const { name, size, type, normalize, stride, offset } = description;
        const gl = this.context.getContext();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        let attribPosition = gl.getAttribLocation(program, name);

        gl.enableVertexAttribArray(attribPosition);
        gl.vertexAttribPointer(attribPosition, size, type, normalize, stride, offset);
    }

    /**
     *
     * @private
     */
    private createBuffer() {
        const buffer = this.context.getContext().createBuffer();
        if (!buffer) throw new Error("WebGLBuffer creating error!");

        return buffer;
    }
}

// vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;
export type GLShaderAttributeDescription = {
    name: string
    size : number;
    type : GLenum;
    normalize : GLboolean;
    stride : GLsizei;
    offset : GLintptr;
}
