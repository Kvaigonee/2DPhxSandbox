import { Interpolation } from "./Interpolation";
import { Translation } from "./Translation";
import AbstractExample from "./AbstractExample";
import { RotationTriangle } from "./RotationTriangle";
import CubeExample from "./Cube";


const examples : Examples = {
    Interpolation,
    Translation,
    RotationTriangle,
    CubeExample
}


let currentExample : AbstractExample | null = null;

const baseContainer = document.createElement("div");
baseContainer.className = "base-container";
document.body.appendChild(baseContainer);

const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
baseContainer.appendChild(buttonsContainer);

const canvasContainer = document.createElement("div");
canvasContainer.className = "canvas-container";
baseContainer.appendChild(canvasContainer);

for (const example of Object.keys(examples)) {
    const button = document.createElement("button");

    buttonsContainer.appendChild(button);
    button.innerText = example;

    button.addEventListener("click", () => {
        if (currentExample) currentExample.destroy();
        currentExample = new examples[example](canvasContainer);
    });
}

type ExampleCtor = new(rootElement: HTMLElement) => AbstractExample;
type Examples = { [key: string] : ExampleCtor }


