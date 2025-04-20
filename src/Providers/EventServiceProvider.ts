import UserObserver from "../Observers/UserObserver";

class EventServiceProvider {

    eventObservers = {}

    constructor() {
        this.boot()
    }

    boot() {
        this.eventObservers = {
            BaseModel: [UserObserver]
        }
    }
}

export default EventServiceProvider;