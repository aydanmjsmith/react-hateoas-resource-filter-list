export class Cell {
    _value;
    _onclickFunc;

    /**
     * @param {String} value
     * @param {Function} onclickFunc
     */
    constructor(value, onclickFunc) {
        this._value = value;
        this._onclickFunc = onclickFunc;
    }
}

export default Cell;