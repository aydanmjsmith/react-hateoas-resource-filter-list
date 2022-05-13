
import EntityFunctions from "../common/EntityFunctions";

export class CustomListDefinition {
    _title;
    _buildFunc;
    _entityFuncs;

    /**
     * @param {String>} title
     * @param {Function} buildFunc
     * @param {EntityFunctions} entityFuncs
    */
    constructor(title, buildFunc, entityFuncs) {
        this._title = title;
        this._buildFunc = buildFunc;
        
        if (entityFuncs) {
            this._entityFuncs = entityFuncs;
        } else {
            this._entityFuncs = new EntityFunctions();
        }
    }

    /**
     * @param {Object} entity
     * @param {Function} callback
     * @returns {EntityRowColumn} entity rows
     */
    buildListItem(entity, callback) {
        const deleteFunc = this._entityFuncs.buildDeleteFunc(entity, callback);
        const editFunc = this._entityFuncs.buildEditFunc(entity, callback);
        return this._buildFunc(entity, editFunc, deleteFunc);
    }
}

export default CustomListDefinition;