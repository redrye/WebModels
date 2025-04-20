import IModel from "./Contracts/IModel";
import EmitsEvents from "./Concerns/EmitsEvents";
class Model implements IModel {
    public attributes: any = {};
    constructor(attributes = {}) {
        this.attributes = attributes;

        
    }

    save() {

    }

    update() {

    }

    delete() {

    }

    forceDelete() {

    }
}