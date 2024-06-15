

export default abstract class AbstractExample {

    protected canvasElement;

    protected rootElement;

    protected constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.canvasElement = this.initCanvasElement();
    }

    public abstract destroy() : void;

    protected initCanvasElement() : HTMLCanvasElement {
        const canvas = document.createElement("canvas");

        canvas.width = 1280;
        canvas.height = 720;

        this.rootElement.appendChild(canvas);

        return canvas;
    };
}