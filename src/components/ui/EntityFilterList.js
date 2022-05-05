import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EntityTableDefinition from '../../classes/table/EntityTableDefinition';
import useEntityFilter from '../../hooks/useEntityFilter';
import EntityTableTitle from './EntityTableTitle';
import EntityTable from './EntityTable';
import EntityPageControls from './EntityPageControls';

const EntityFilterList = ({resourceUrl, getEntities, tableDef, paged}) => {
    const [showFilters, setShowFilters] = useState(false);
    const { result, filterDef } = useEntityFilter(resourceUrl, getEntities, paged, "");
    
    console.log("result");
    console.log(result);
    console.log("entityFilterDefinition");
    console.log(filterDef);
    console.log("tableDefinition");
    console.log(tableDef);

    if (!filterDef) {
        return null;
    }

    const entities = result._embedded ? Object.values(result._embedded)[0] : [];

    return (
        <React.Fragment>
            <EntityTableTitle 
                tableDef={tableDef} 
                filterDef={filterDef} 
                page={result.page}
                toggleFiltersFunc={() => setShowFilters(!showFilters)}/>
            <EntityTable 
                tableDef={tableDef} 
                filterDef={filterDef} 
                showFilters={showFilters}
                entities={entities} />
            { paged 
                ?   <EntityPageControls
                        filterDef={filterDef}
                        page={result.page}
                        links={result._links}/>
                : null }
        </React.Fragment>
    );
}

export default EntityFilterList;

EntityFilterList.propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    getEntities: PropTypes.func.isRequired,
    tableDef: PropTypes.instanceOf(EntityTableDefinition).isRequired,
    paged: PropTypes.bool.isRequired,
}