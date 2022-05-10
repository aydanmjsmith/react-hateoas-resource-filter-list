import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import EntityFilterDefinition from '../classes/filter/EntityFilterDefinition';

/**
 * @param {String} resourceUrl
 * @param {Function} getEntities
 * @param {Boolean} paged
 * @returns {Object[], EntityFilterDefinition} 
 */
const useEntityFilter = (resourceUrl, getEntities, paged) => {
    const [result, setResult] = useState(null); 
    const filterDef = useRef(null);

    useEffect(() => {
        filterDef.current = new EntityFilterDefinition(resourceUrl, getEntities, setResult, paged);
    }, []);
    
    useEffect(() => {
        // if (state) {
        //     console.log("1");
        //     const url = new URL(state.resourceUrl);
        //     const fsp = url.searchParams.get('filter') + ",";
        //     console.log("2");
        //     const m = fsp.matchAll(/(\w.+?)(:|<|>)([\w,. ]+?),/g);
        //     console.log("3");
        //     for (const fm of m) {
        //         console.log("4");
        //         const epf = new EntityPropertyFilter(fm[1], fm[2], fm[3]);
        //         const updFilters = filters.current.filter(x => x._property != epf._property);
        //         if (epf._fString) {
        //             updFilters.push(epf);
        //         }

        //         filters.current = updFilters;
        //     }
        //     console.log("5 " + state.resourceUrl);
        //     setFilterUrl(state.resourceUrl);
        
        // } else {
    }, [resourceUrl]);

    return { result, filterDef: filterDef.current };
}

useEntityFilter.propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    getEntities: PropTypes.func.isRequired,
    paged: PropTypes.bool.isRequired,
}

export default useEntityFilter;