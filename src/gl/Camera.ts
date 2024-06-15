import {mat4, ReadonlyMat4, ReadonlyVec3} from "gl-matrix";

const DEFAULT_PARAMETERS : ICameraParameters = {
    fov : (Math.PI / 180) * 60, // 60 degree to radians
    aspect : 16 / 9,
    near : 1,
    far : 2000
}

const DEFAULT_POSITION : [number, number, number] = [0, 0, 5];
const DEFAULT_TARGET : [number, number, number] = [0, 0, 0];
const DEFAULT_UP : [number, number, number] = [0, 1, 0];

export default class Camera {

    /**
     *
     */
    private fov : number;

    /**
     *
     */
    private aspect : number;

    /**
     *
     */
    private near : number;

    /**
     *
     */
    private far : number;

    /**
     *
     * @private
     */
    private position : ReadonlyVec3;

    /**
     *
     * @private
     */
    private matrix : mat4 = mat4.create();

    /**
     *
     * @private
     */
    private projectionMatrix : ReadonlyMat4;

    /**
     *
     * @param position
     * @param parameters
     */
    public constructor(position: ReadonlyVec3 = DEFAULT_POSITION,
                       parameters: ICameraParameters = DEFAULT_PARAMETERS) {

        const { fov, aspect, near, far } = parameters;

        this.fov = fov;
        this.aspect = aspect;
        this.far = far;
        this.near = near;
        this.position = position;

        this.projectionMatrix = mat4.perspectiveNO(mat4.create(), fov, aspect, near, far);
        this.lookAt(DEFAULT_TARGET, DEFAULT_UP);
    }

    public getFov() {
        return this.fov;
    }

    public getAspect() {
        return this.aspect;
    }

    public getFar() {
        return this.far;
    }

    public getNear() {
        return this.near;
    }

    public getMatrix() {
        return this.matrix;
    }

    public getInvertedMatrix() {
        return mat4.invert(mat4.create(), this.matrix);
    }

    public getProjectionMatrix() : ReadonlyMat4 {
        return this.projectionMatrix;
    }

    public getPosition() {
        return [...this.position];
    }

    public rotate(radians: number) {
        this.matrix = mat4.rotateY(mat4.create(), this.matrix, radians);
    }

    public translate(translate: ReadonlyVec3) {
        this.matrix = mat4.translate(mat4.create(), this.matrix, translate);
    }

    public setPosition(position: ReadonlyVec3) {
        this.position = position;
    }

    public lookAt(target: ReadonlyVec3, up: ReadonlyVec3) {
        this.matrix = mat4.lookAt(mat4.create(), this.position, target, up);
    }
}

export interface ICameraParameters {
    /**
     *
     */
    fov : number;

    /**
     *
     */
    aspect : number;

    /**
     *
     */
    near : number;

    /**
     *
     */
    far : number;
}