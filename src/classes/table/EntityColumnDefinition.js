import { resolvePath  } from '../../utils/utils';
import EntityFunctionDefinition from './EntityFunctionDefinition';
import EntityRowColumn from './EntityRowColumn';

export class EntityColumnDefinition {
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
     * @param {EntityFunctionDefinition} func
     */
    set onclickFunc(func) {
        this._onclickFunc = func
    }

    /**
     * @param {EntityFunctionDefinition} func
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
     * @returns {EntityRowColumn} entity rows
     */
     buildRowColumn(entity, callback) {
        const value = this.hasFormatFunc()
            ? this._formatFunc(resolvePath(entity, this._property)) 
            : resolvePath(entity, this._property);
        
        const onclickFunc = this.hasOnclickFunc()
            ? () => this._onclickFunc.buildFunc(entity, callback)
            : null;

        return new EntityRowColumn(value, onclickFunc);
    }
}

export default EntityColumnDefinition;