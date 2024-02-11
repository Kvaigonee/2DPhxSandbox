import {AbstractEventMap} from "./utils/EventEmmiter";

export default interface IValidatedEventMap extends AbstractEventMap {

    valid : {};

    invalid : {};
}