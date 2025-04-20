import UserObserver from "../Observers/UserObserver";
import {BaseModel} from "../index";
import BaseObserver from "../Observers/BaseObserver";

class EventServiceProvider {

    eventObservers = {}

    constructor() {
        this.boot()
    }

    boot() {
        this.eventObservers = {
            BaseModel: [BaseObserver]
        }
    }
}

export default EventServiceProvider;