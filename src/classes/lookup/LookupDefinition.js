
import LookupProperty from "../lookup/lookupProperty";

export class LookupDefinition {
    _title;
    _properties;

    /**
     * @param {String>} title
     * @param {Array.<LookupProperty>} properties
    */
    constructor(title, properties) {
        this._title = title;
        this._properties = properties;
    }
}

export default LookupDefinition;