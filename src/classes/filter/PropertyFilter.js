export class PropertyFilter {
    /**
     * @param {String} property
     * @param {String} operation
     * @param {String} value
     */
    constructor(property, operation, value) {
        this._property = property;
        this._operation = operation;
        this._value = value;
    }

    /**
     * builds url param for this filter
     * 
     * @param {String} property
     * @param {String} operation
     * @returns {String} filter url parameter
     */
    buildFilterUrlParam() {
        return `${this._property}${this._operation}${this._value}`;
    }
}

export default PropertyFilter;