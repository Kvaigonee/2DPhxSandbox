/**
 *
 */
export default class EventEmitter<
    EventMap extends AbstractEventMap> {

    /**
     *
     * @private
     */
    private eventListenerList : Map<keyof EventMap, EventListener<EventMap, keyof EventMap>>
        = new Map<keyof EventMap, EventListener<EventMap, keyof EventMap>>();

    /**
     *
     * @protected
     */
    protected constructor() {
    }

    /**
     *
     * @param key
     * @param listener
     */
    public addEventListener(key : keyof EventMap, listener : EventListener<EventMap, keyof EventMap>) {
        this.eventListenerList.set(key, listener);
    }

    /**
     *
     * @param key
     * @param data
     */
    public emitEvent(key : keyof EventMap, data : EventMap[keyof EventMap]) {
        const callback = this.eventListenerList.get(key);

        if (!callback) {
            console.warn(`Event ${key.toString()} have not listeners now!`);
            return;
        }

        callback(data);
    }

    /**
     *
     * @param key
     */
    public removeEventListener(key : keyof EventMap) {
        this.eventListenerList.delete(key);
    }
}


export type EventListener<T extends AbstractEventMap, E extends keyof T> = (evt : T[E]) => void;

export interface AbstractEventMap {
}

