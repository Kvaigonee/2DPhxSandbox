import GLContext from "./GLContext";


export default class GLTexture {

    /**
     *
     * @private
     */
    private glTexture : WebGLTexture;

    /**
     *
     * @private
     */
    private gl : WebGLRenderingContext;

    /**
     *
     * @param glContext
     * @param url
     */
    public constructor(glContext: GLContext, url ?: string) {
        const gl = glContext.getContext();
        const texture = gl.createTexture();
        if (texture === null) throw new Error("Error creating glTexture");

        this.glTexture = texture;
        this.gl = gl;

        this.bind();

        // Fill the texture with a 1x1 pixel
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([128, 128, 128, 255]));

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        if (url) {
            this.loadTextureSource(url);
        }
    }

    /**
     *
     */
    public active() {}

    /**
     *
     */
    public bind() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
    }

    /**
     *
     * @private
     */
    private loadTextureSource(url : string) {
        const image = new Image();
        image.src = url;
        image.addEventListener("load", this.onLoadTextureSource.bind(this, image));
    }

    /**
     *
     * @private
     */
    private onLoadTextureSource(image : HTMLImageElement) {
        const gl = this.gl;
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
}