export function createProgram(gl: WebGL2RenderingContext,
                       vertexShader: WebGLShader,
                       fragmentShader: WebGLShader) : WebGLProgram {
    let program = gl.createProgram();
    if (program === null) {
        throw new Error("Unable to create WebGL Program!");
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    gl.deleteProgram(program);
    throw new Error("Unable to create WebGL Program!");
}
