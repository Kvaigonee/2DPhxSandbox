export function getWebGLContext() : WebGL2RenderingContext {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");

    canvas.width = 1280;
    canvas.height = 720;

    document.body.appendChild(canvas);

    if (!gl) {
        throw `Context is ${gl}`;
    }

    return gl;
}