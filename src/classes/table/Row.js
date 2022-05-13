import Cell from "./Cell";

export class Row {
    _cells;
    _deleteFunc;
    _editFunc;

    /**
     * @param {Array.<Cell>} cells
     * @param {Function} deleteFunc
     * @param {Function} editFunc
     */
    constructor(cells, deleteFunc, editFunc) {
        this._cells = cells;
        this._deleteFunc = deleteFunc;
        this._editFunc = editFunc;
    }
}

export default Row;