const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

/**
 *
 */
export function getWebGLContext() : WebGL2RenderingContext {
    let canvas = document.querySelector("canvas");
    canvas = canvas !== null ? canvas : document.createElement("canvas");

    const gl = canvas.getContext("webgl2");
    if (!gl) throw `Context is ${gl}`;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    document.body.appendChild(canvas);

    return gl;
}

/**
 *
 */
export {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
}