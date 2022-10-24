import {createShader} from "./Shader";

/**
 *
 */
export function getShaderPair(context: WebGL2RenderingContext,
                              vsSource: string,
                              fsSource: string) : ShaderPair {
    return {
        vertexShader: createShader(context, context.VERTEX_SHADER, vsSource),
        fragmentShader: createShader(context, context.FRAGMENT_SHADER, fsSource)
    }
}

/**
 *
 */
export type ShaderPair = {
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
}