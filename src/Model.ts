import IModel from "./Contracts/IModel";
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