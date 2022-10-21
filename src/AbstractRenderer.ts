
class AbstractRenderer {

    scene: AbstractScene;

    context: AbstractContext;

    public constructor(scene: AbstractScene, context: AbstractContext) {
        this.scene = scene;
        this.context = context;
    }

}


export class AbstractScene {

    sceneObjectList : Set<AbstractSceneObject> = new Set<AbstractSceneObject>();


    addObject(mesh: AbstractMesh, position: AbstractPosition) {

    }
}


let scene = new AbstractScene();

scene.addObject({}, {});

class AbstractMesh {

}

class AbstractPosition {

}



class AbstractSceneObject {

}

// Что у нас есть для webGL ?

class AbstractContext {

}

class AbsractShader {

}

class AbstractProgramm {

}

class AbstractBufferObject {

}