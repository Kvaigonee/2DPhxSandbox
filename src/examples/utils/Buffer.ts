/**
 *
 */
export class Buffer {
    /**
     *
     */
    private readonly gl : WebGL2RenderingContext;

    /**
     *
     */
    private readonly buffer : WebGLBuffer;

    /**
     *
     * @param gl
     */
    public constructor(gl : WebGL2RenderingContext) {
        let buffer = gl.createBuffer();
        if(buffer === null) throw new Error("Buffer was not created!");

        this.gl = gl;
        this.buffer = buffer;
    }

    /**
     *
     * @param data
     */
    public setData(data: BufferSource) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    }

    /**
     *
     */
    public setShaderAttribute(program: WebGLProgram, description: ShaderAttributeDescription) {
        const {name, size, type, normalize, stride, offset} = description;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

        let attribPosition = this.gl.getAttribLocation(program, name);
        this.gl.enableVertexAttribArray(attribPosition);

        this.gl.vertexAttribPointer(
            attribPosition, size, type, normalize, stride, offset);
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
