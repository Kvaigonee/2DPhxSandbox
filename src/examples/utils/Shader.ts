/**
 *
 * @param gl
 * @param type
 * @param source
 */
export function createShader(gl: WebGL2RenderingContext,
                             type: ShaderType,
                             source: string) : WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Unable to create shader with type " + type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    gl.deleteShader(shader);
    throw new Error("Unable to create shader with type " + type);
}

/**
 *
 */
type ShaderType = WebGL2RenderingContext["FRAGMENT_SHADER"] | WebGL2RenderingContext["VERTEX_SHADER"];