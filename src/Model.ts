import {BaseModel} from "./index";
class Model extends BaseModel {
    public attributes: any = {};
    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Model