export default interface IModelBootable {
    booted: boolean;
    bootIfNotBooted(): void;

    /**
     * Initializes and sets the attributes for an object. If the `attributes` key exists within the passed object,
     * its values are deeply assigned to the `attributes` and `original_attributes` properties.
     * For other keys, their values are directly assigned to the respective properties.
     *
     * @param {Object} attributes - The object containing attributes to be set. Can include nested `attributes` key.
     * @return {void} This method does not return a value.
     */
    bootAttributes(attributes): void;

    /**
     * Sets an attribute in the `attributes` and `original_attributes` objects
     * and defines a corresponding setter and getter for the specified key.
     *
     * @param {string} key - The key of the attribute to set.
     * @param {*} value - The value of the attribute to set.
     * @return {void} Does not return a value.
     */
    setAttributeFromBoot(key, value): void;
}