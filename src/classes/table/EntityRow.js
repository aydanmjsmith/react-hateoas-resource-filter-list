import EntityRowColumn from "./EntityRowColumn";

export class EntityRow {
    _columns;
    _deleteFunc;
    _editFunc;

    /**
     * @param {Array.<EntityRowColumn>} columns
     * @param {Function} deleteFunc
     * @param {Function} editFunc
     */
    constructor(columns, deleteFunc, editFunc) {
        this._columns = columns;
        this._deleteFunc = deleteFunc;
        this._editFunc = editFunc;
    }
}

export default EntityRow;