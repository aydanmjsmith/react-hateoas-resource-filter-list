import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import EntityFilterDefinition from '../classes/filter/EntityFilterDefinition';
// import { useSelector, useDispatch } from 'react-redux';
// import { saveEntityFilterState } from '../store/actions/entityFilterActions';

/**
 * 
 * @param {String} resourceUrl
 * @param {boolean} paged
 * @param {String} uuId
 * @returns {Object[], EntityFilterDefinition} 
 */
const useEntityFilter = (resourceUrl, paged, uuId) => {
    //const dispatch = useDispatch();
    // const state = useSelector(state => state.entityFilter.entityFilterStates
    //     .find(s => s.uuId === uuId));
    const [responseData, setResponseData] = useState(null); 
    const filterDef = useRef(null);

    useEffect(() => {
        console.log("useEntityFilter useEffect: DO ONLY ONCE")
        filterDef.current = new EntityFilterDefinition(resourceUrl, paged);
        filterDef.current.refreshFunc = () => getEntities();
        getEntities();
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

    const getEntities = async () => {
        try {
            const response = await axios.get(filterDef.current._filterUrl);
            setResponseData(response.data);
            //dispatch(saveEntityFilterState(uuId, result.data._links.self.href));
        } catch (e) {
            alert(e);
        }
    };

    return { responseData, filterDef: filterDef.current };
}

export default useEntityFilter;