import EventEmitter from "./EventEmitter";
import {MODEL_EVENTS} from "./Config/Model";
import Str from "./Facades/Str";
import EventServiceProvider from "./Providers/EventServiceProvider";
import eventServiceProvider from "./Providers/EventServiceProvider";

class BaseModel {
    has_events = true;
    emitter: EventEmitter = new EventEmitter();
    class_name: string = '';
    booted = false;
    table: any = null;
    attributes = {}
    constructor(attributes = {}) {
        this.attributes = attributes;
        this.bootIfNotBooted()
    }

    bootIfNotBooted() {
        if(!this.booted) {
            this.boot()
        }
    }

    boot() {
        this.bootTable()
        this.bootEvents()
        this.fireEvent(MODEL_EVENTS.BOOTING)
        this.booted = true;
        this.fireEvent(MODEL_EVENTS.BOOTED)
    }

    bootEvents() {
        if(this.has_events) {
            this.emitter = new EventEmitter();
            var eventServiceProvider = new EventServiceProvider()
            var className = this.table
            console.log(eventServiceProvider)
            console.log(this.class_name)
            console.log('test')

            if(this.class_name in eventServiceProvider.eventObservers) {
                let observers = eventServiceProvider.eventObservers[this.class_name];
                observers.forEach(observer => {
                    console.log(observer);

                    Object.keys(observer).forEach(key => {
                        console.log(key)
                        console.log(key, '->', observer[key]);
                        this.emitter.on(key, observer[key](this));
                    })
                })
            }
        }
    }

    bootTable() {
        if(this.table == null) {
            this.table = Str.snake(this.constructor.name)
        } else {
            this.table = Str.snake(this.table)
        }
        this.class_name = this.constructor.name
        console.log(this)
    }

    fireEvent(event) {
        console.log(event)
        this.emitter.emit(event, this)
    }

    on(eventName, callback) {
        this.emitter.on(eventName, callback)
    }
    off(eventName, callback) {

        this.emitter.off(eventName, callback)

    }


    save() {
        this.fireEvent(MODEL_EVENTS.SAVING)

        this.fireEvent(MODEL_EVENTS.SAVED)
    }
    update() {
        this.fireEvent(MODEL_EVENTS.UPDATING)

        this.fireEvent(MODEL_EVENTS.UPDATED)
    }
    delete() {
        this.fireEvent(MODEL_EVENTS.DELETING)

        this.fireEvent(MODEL_EVENTS.DELETED)
    }
    forceDelete() {
        this.fireEvent(MODEL_EVENTS.FORCE_DELETING)

        this.fireEvent(MODEL_EVENTS.FORCE_DELETED)
    }
    isDirty() {

    }
    isClean() {

    }

}

export default BaseModel;