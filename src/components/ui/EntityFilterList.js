import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EntityTableDefinition from '../../classes/table/EntityTableDefinition';
import useEntityFilter from '../../hooks/useEntityFilter';
import EntityTableTitle from './EntityTableTitle';
import EntityTable from './EntityTable';
import EntityPageControls from './EntityPageControls';

const EntityFilterList = ({resourceUrl, tableDef, paged}) => {
    const [showFilters, setShowFilters] = useState(false);
    const { responseData, filterDef } = useEntityFilter(resourceUrl, paged, "");
    
    console.log("responseData");
    console.log(responseData);
    console.log("entityFilterDefinition");
    console.log(filterDef);
    console.log("tableDefinition");
    console.log(tableDef);

    if (!filterDef) {
        return null;
    }

    const entities = responseData._embedded ? Object.values(responseData._embedded)[0] : [];

    return (
        <React.Fragment>
            <EntityTableTitle 
                tableDef={tableDef} 
                filterDef={filterDef} 
                page={responseData.page}
                toggleFiltersFunc={() => setShowFilters(!showFilters)}/>
            <EntityTable 
                tableDef={tableDef} 
                filterDef={filterDef} 
                showFilters={showFilters}
                entities={entities} />
            { paged 
                ?   <EntityPageControls
                        filterDef={filterDef}
                        page={responseData.page}
                        links={responseData._links}/>
                : null }
        </React.Fragment>
    );
}

export default EntityFilterList;

EntityFilterList.propTypes = {
    resourceUrl:  PropTypes.string.isRequired,
    tableDef: PropTypes.instanceOf(EntityTableDefinition).isRequired,
    paged:  PropTypes.bool.isRequired,
}