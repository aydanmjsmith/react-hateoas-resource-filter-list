import { resolvePath  } from '../../utils/utils';
import FunctionDefinition from '../common/FunctionDefinition';
import Cell from './Cell';

export class Column {
    _title;
    _property;
    _filterType;

    /**
     * @param {String} title
     * @param {String} property
     * @param {String} filterType
     */
    constructor(title, property, filterType) {
        this._title = title;
        this._property = property;
        this._filterType = filterType;
    }

    /**
     * @param {FunctionDefinition} func
     */
    set onclickFunc(func) {
        this._onclickFunc = func
    }

    /**
     * @param {Function} func
     */
    set formatFunc(func) {
        this._formatFunc = func
    }

    hasOnclickFunc() {
        return this._onclickFunc ? true : false;
    }

    hasFormatFunc() {
        return this._formatFunc ? true : false;
    }

    /**
     * @param {Object} entity
     * @param {Function} callback
     * @returns {Cell} cell
     */
     buildCell(entity, callback) {
        const value = this.hasFormatFunc()
            ? this._formatFunc(resolvePath(entity, this._property)) 
            : resolvePath(entity, this._property);
        
        const onclickFunc = this.hasOnclickFunc()
            ? () => this._onclickFunc.buildFunc(entity, callback)
            : null;

        return new Cell(value, onclickFunc);
    }
}

export default Column;