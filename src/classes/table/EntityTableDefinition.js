import EntityFilterDefinition from "../filter/EntityFilterDefinition";
import EntityColumnDefinition from "./EntityColumnDefinition";
import EntityFunctionDefinition from "./EntityFunctionDefinition";
import EntityRow from "./EntityRow";

export class EntityTableDefinition {
    _title;
    _columnDefs;

    /**
     * @param {String>} title
     * @param {Array.<EntityColumnDefinition>} columnDefs
    */
    constructor(title, columnDefs) {
        this._title = title;
        this._columnDefs = columnDefs
    }

    /**
     * @param {EntityFilterDefinition} filterDef
     */
    set filterDef(filterDef) {
        this._filterDef = filterDef
    }

    /**
     * @param {EntityFunctionDefinition} func
     */
     set deleteFunc(func) {
        this._deleteFunc = func
    }

    /**
     * @param {EntityFunctionDefinition} func
     */
     set editFunc(func) {
        this._editFunc = func
    }

    /**
     * @param {Function} func
     */
     set addFunc(func) {
        this._addFunc = func
    }

    hasDeleteFunc() {
        return this._deleteFunc ? true : false;
    }

    hasEditFunc() {
        return this._editFunc ? true : false;
    }

    hasAddFunc() {
        return this._addFunc ? true : false;
    }

    /**
     * @param {Array.<Object>} entities
     * @returns {Array.<EntityRow>} entity rows
     */
    buildRows(entities) {
        const f = entities.map((entity) => this.buildRow(entity));
        return entities.map((entity) => this.buildRow(entity));
    }

    /**
     * @param {Object} entity
     * @returns {EntityRow} entity row
     */
    buildRow(entity) {
        var rowColumns = this._columnDefs
            .map((columnDef) => columnDef.buildRowColumn(entity));
        
        const deleteFunc = this.hasDeleteFunc()
            ? () => this._deleteFunc.buildFunc(entity)
            : null;

        const editFunc = this.hasEditFunc()
            ? () => this._editFunc.buildFunc(entity)
            : null;

        return new EntityRow(rowColumns, deleteFunc, editFunc);
    }
}

export default EntityTableDefinition;