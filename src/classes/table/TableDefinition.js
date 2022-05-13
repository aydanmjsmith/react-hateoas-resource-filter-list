import EntityFunctions from "../common/EntityFunctions";
import Column from "./Column";
import Row from "./Row";

export class TableDefinition {
    _title;
    _columns;
    _entityFuncs;

    /**
     * @param {String>} title
     * @param {Array.<Column>} columns
     * @param {EntityFunctions} entityFuncs
    */
    constructor(title, columns, entityFuncs) {
        this._title = title;
        this._columns = columns;

        if (entityFuncs) {
            this._entityFuncs = entityFuncs;
        } else {
            this._entityFuncs = new EntityFunctions
        }
    }

    /**
     * @param {Array.<Object>} entities
     * @param {Function} callback
     * @returns {Array.<EntityRow>} entity rows
     */
    buildRows(entities, callback) {
        return entities.map((entity) => this.buildRow(entity, callback));
    }

    /**
     * @param {Object} entity
     * @param {Function} callback
     * @returns {EntityRow} entity row
     */
    buildRow(entity, callback) {
        var cells = this._columns
            .map((column) => column.buildCell(entity, callback));
        
        const deleteFunc = this._entityFuncs.buildDeleteFunc(entity, callback);
        const editFunc = this._entityFuncs.buildEditFunc(entity, callback);

        return new Row(cells, deleteFunc, editFunc);
    }
}

export default TableDefinition;