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

for (const example of Object.keys(examples)) {
    const button = document.createElement("button");
    document.body.appendChild(button);

    button.innerText = example;

    button.addEventListener("click", () => {
        if (currentExample) currentExample.destroy();

        currentExample = new examples[example]();
    });
}

type ExampleCtor = new() => AbstractExample;
type Examples = { [key: string] : ExampleCtor }


