/**
 *
 */
export default class EventEmitter<
    EventMap extends AbstractEventMap> {

    /**
     *
     * @private
     */
    private eventListenersList : EventListenersList<EventMap> = new Map();

    /**
     *
     * @protected
     */
    protected constructor() {
    }

    /**
     *
     * @param key
     * @param callback
     */
    public addEventListener(key : keyof EventMap, callback : EventListener<EventMap, keyof EventMap>) {
        let listeners = this.eventListenersList.get(key);

        if (!listeners) {
            listeners = new Set();
            this.eventListenersList.set(key, listeners);

            listeners.add(callback);
            return;
        }

        if (listeners.has(callback)) return;

        listeners.add(callback);
    }

    /**
     *
     * @param key
     * @param data
     */
    public emitEvent(key : keyof EventMap, data : EventMap[keyof EventMap]) {
        const listeners = this.eventListenersList.get(key);

        if (!listeners) {
            console.warn(`Event ${key.toString()} have not listeners now!`);
            return;
        }

        for (const callback of listeners) {
            callback(data);
        }
    }

    /**
     *
     * @param key
     * @param callback
     */
    public removeEventListener(key : keyof EventMap, callback : EventListener<EventMap, keyof EventMap>) : boolean {
        const listeners = this.eventListenersList.get(key);

        if (!listeners) {
            console.warn(`Event ${key.toString()} have not listeners now!`);
            return false;
        }

        return listeners.delete(callback);
    }

    /**
     *
     * @param key
     */
    public removeAllEventListeners(key : keyof EventMap) : boolean {
        return this.eventListenersList.delete(key);
    }
}

type EventListenersListElement<EventMap extends AbstractEventMap> = Set<EventListener<EventMap, keyof EventMap>>;

export type EventListenersList<EventMap extends AbstractEventMap> = Map<keyof EventMap, EventListenersListElement<EventMap>>;

export type EventListener<T extends AbstractEventMap, E extends keyof T> = (evt : T[E]) => void;

export interface AbstractEventMap {
}

