import FunctionDefinition from "./FunctionDefinition";

export class EntityFunctions {
    /**
     * @param {FunctionDefinition} func
     */
     set deleteFunc(func) {
        this._deleteFunc = func
    }

    /**
     * @param {FunctionDefinition} func
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
     * @param {Object} entity
     * @param {Function} callback
     * @returns {Function} edit function
     */
    buildEditFunc(entity, callback) {
        return this.hasEditFunc()
            ? () => this._editFunc.buildFunc(entity, callback)
            : null;
    }

    /**
     * @param {Object} entity
     * @param {Function} callback
     * @returns {Function} delete function
     */
     buildDeleteFunc(entity, callback) {
        return this.hasDeleteFunc()
            ? () => this._deleteFunc.buildFunc(entity, callback)
            : null;
    }
}

export default EntityFunctions;