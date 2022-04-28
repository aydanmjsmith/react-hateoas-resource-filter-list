import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import EntityTableDefinition from '../../classes/table/EntityTableDefinition';
import EntityFilterDefinition from '../../classes/filter/EntityFilterDefinition';
import EntityPropertyFilter from '../../classes/filter/EntityPropertyFilter';

const EntityTableHeader = ({tableDef, filterDef, showFilters}) => {
    const asc = useRef(true);

    const sort = (property) => {
        filterDef.setSort(`${property},${asc.current ? 'asc' : 'desc'}`);
        asc.current = !asc.current;
    }

    return (
        <React.Fragment>
            <thead>
                <tr>
                    { tableDef._columnDefs.map((columnDef) => 
                        <th key={columnDef._property}>
                            {columnDef._title}&nbsp;
                            <FontAwesomeIcon 
                                onClick={() => sort(columnDef._property)} 
                                style={{ cursor: 'pointer' }} 
                                icon={faSort} size="sm" 
                                data-bs-toggle="tooltip"
                                title="sort" />
                            <EntityTableColumnFilter 
                                columnDef={columnDef} 
                                filterDef={filterDef} 
                                showFilters={showFilters} />
                        </th>
                    )}
                    <th style={{width: "60px"}} />
                </tr>
            </thead>
        </React.Fragment>
    );
}

export default EntityTableHeader;

EntityTableHeader.propTypes = {
    tableDef: PropTypes.instanceOf(EntityTableDefinition).isRequired,
    filterDef: PropTypes.instanceOf(EntityFilterDefinition).isRequired,
    showFilters: PropTypes.bool.isRequired,
}

const EntityTableColumnFilter = ({columnDef, filterDef, showFilters}) => {
    const [filter, setFilter] = useState(filterDef.getPropertyFilterValue(columnDef._property));
    const debouncedFilter = useDebouncedValue(filter, 500);
    
    useEffectExceptOnMount(() => {
        const epf = new EntityPropertyFilter(columnDef._property, ':', debouncedFilter);
        filterDef.setPropertyFilter(epf);
    }, [debouncedFilter]);

    const onChange = (event) => {
        setFilter(event.target.value);
    }

    if (!showFilters) {
        return null;
    }

    var filterInput = null;
    switch(columnDef._filterType) {
        case 'string': 
            filterInput = 
                <Input 
                    type="text" 
                    placeholder={columnDef._title} 
                    name={columnDef._title} 
                    onChange={onChange} 
                    value={filter} />;
            break;
        default:
    }

    return (
        <React.Fragment>
            <br />{filterInput}
        </React.Fragment>
    );
}