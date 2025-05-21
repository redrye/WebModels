import { BaseModel } from "./index";

/**
 * Represents a model that extends the functionality of the BaseModel.
 * Provides a structure for managing attributes and initializing the model.
 */
class Model extends BaseModel {
    /**
     * Stores the attributes of the model.
     * This object contains key-value pairs representing the model's state.
     */
    public attributes: any = {};

    /**
     * Constructs a new instance of the Model class.
     * Initializes the model with the provided attributes.
     *
     * @param {Object} attributes - An optional object containing initial attributes for the model.
     */
    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Model;