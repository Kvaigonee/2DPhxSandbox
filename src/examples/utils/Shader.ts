type ShaderType = WebGL2RenderingContext["FRAGMENT_SHADER"] | WebGL2RenderingContext["VERTEX_SHADER"];

export function createShader(gl: WebGL2RenderingContext,
                      type: ShaderType,
                      source: string) : WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
        throw new Error("Unable to create shader with type " + type);
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    gl.deleteShader(shader);
    throw new Error("Unable to create shader with type " + type);
}