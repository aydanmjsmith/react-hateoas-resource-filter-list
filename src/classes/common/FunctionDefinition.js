import { resolvePath  } from '../../utils/utils';

export class FunctionDefinition {
    _func;
    _argProps;

    /**
     * @param {Function} func
     * @param {String} argProp
     */
    constructor(func, ...argProps) {
        this._func = func;
        this._argProps = argProps;
    }

    /**
     * @param {Object} entity
     * @param {Function} callback
     * @returns {Function} the function
     */
    buildFunc(entity, callback) {
        const argVals = this._argProps.map(arg => resolvePath(entity, arg));
        return this._func({ args: argVals, callback } );
    }
}

export default FunctionDefinition;