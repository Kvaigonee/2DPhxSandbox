/**
 *
 */
export default class InputRange {

    /**
     *
     * @private
     */
    private input : HTMLInputElement = document.createElement("input");

    /**
     *
     * @param max
     * @param min
     * @param value
     */
    public constructor(private max: number = 200,
                       private min: number = -200,
                       private value: number = 100) {
        this.input.type = "range";

        this.input.min = this.min.toString();
        this.input.max = this.max.toString();
        this.input.value = this.value.toString();

        window.document.body.appendChild(this.input);
    }

    /**
     *
     */
    public setChangeCallback(callback: InputCallback) {
        this.input.oninput = callback.bind(this, +this.input.value);
    }

    public getElement() : HTMLInputElement {
        return this.input;
    }


    /**
     *
     */
    public removeFromDOM() {
        window.document.body.removeChild(this.input);
    }
}

/**
 *
 */
export type InputCallback = (value: number) => void;