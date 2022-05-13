import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomListDefinition from '../../classes/custom/CustomListDefinition';
import useEntityFilter from '../../hooks/useEntityFilter';
import EntityPageControls from './EntityPageControls';
import EntityListTitle from './EntityListTitle';
import { Row } from 'reactstrap';

const EntityCustomList = ({resourceUrl, getEntities, customListDef, paged}) => {
    const [showFilters, setShowFilters] = useState(false);
    const {result, filterDef} = useEntityFilter(resourceUrl, getEntities, paged);

    const refreshTable = () => {
        filterDef.filter();
    }

    if (!filterDef) {
        return null;
    }

    const entities = result._embedded ? Object.values(result._embedded)[0] : [];
    
    return (
        <React.Fragment>
            <EntityListTitle
                title={customListDef._title} 
                functions={customListDef._entityFuncs} 
                filterDef={filterDef} 
                page={result.page}
                toggleFiltersFunc={() => setShowFilters(!showFilters)}/>
            <div className="row m-0">
                { entities.length > 0
                    ? entities.map((entity) => customListDef.buildListItem(entity, refreshTable))
                    : <span>No results</span>
                }
            </div>
            { paged 
                ?   <EntityPageControls
                        filterDef={filterDef}
                        page={result.page}
                        links={result._links}/>
                : null }
        </React.Fragment>
    );
}

export default EntityCustomList;

EntityCustomList.propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    getEntities: PropTypes.func.isRequired,
    customListDef: PropTypes.instanceOf(CustomListDefinition).isRequired,
    paged: PropTypes.bool.isRequired,
}