import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableDefinition from '../../classes/table/TableDefinition';
import useEntityFilter from '../../hooks/useEntityFilter';
import EntityTable from './EntityTable';
import EntityPageControls from './EntityPageControls';
import EntityListTitle from './EntityListTitle';

const EntityList = ({resourceUrl, getEntities, tableDef, paged}) => {
    const [showFilters, setShowFilters] = useState(false);
    const {result, filterDef} = useEntityFilter(resourceUrl, getEntities, paged);

    if (!filterDef) {
        return null;
    }

    const entities = result._embedded ? Object.values(result._embedded)[0] : [];

    return (
        <React.Fragment>
            <EntityListTitle
                title={tableDef._title}
                functions={tableDef._entityFuncs} 
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

export default EntityList;

EntityList.propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    getEntities: PropTypes.func.isRequired,
    tableDef: PropTypes.instanceOf(TableDefinition).isRequired,
    paged: PropTypes.bool.isRequired,
}