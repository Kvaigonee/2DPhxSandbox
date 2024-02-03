

export default abstract class AbstractExample {

    protected canvasElement;

    protected constructor() {
        this.canvasElement = this.initCanvasElement();
    }

    public abstract destroy() : void;

    protected initCanvasElement() : HTMLCanvasElement {
        const canvas = document.createElement("canvas");

        canvas.width = 1280;
        canvas.height = 720;

        document.body.appendChild(canvas);

        return canvas;
    };
}