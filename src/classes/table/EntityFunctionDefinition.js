import { resolvePath  } from '../../utils/utils';

export class EntityFunctionDefinition {
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

    buildFunc(entity) {
        const argVals = this._argProps.map(arg => resolvePath(entity, arg));
        return this._func(argVals);
    }
}

export default EntityFunctionDefinition;