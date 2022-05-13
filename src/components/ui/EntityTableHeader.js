import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import TableDefinition from '../../classes/table/TableDefinition';
import FilterDefinition from '../../classes/filter/FilterDefinition';
import PropertyFilter from '../../classes/filter/PropertyFilter';

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
                    { tableDef._columns.map((column) => 
                        <th key={column._property}>
                            {column._title}&nbsp;
                            <FontAwesomeIcon 
                                onClick={() => sort(column._property)} 
                                style={{ cursor: 'pointer' }} 
                                icon={faSort} size="sm" 
                                data-bs-toggle="tooltip"
                                title="sort" />
                            <EntityTableColumnFilter 
                                column={column} 
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
    tableDef: PropTypes.instanceOf(TableDefinition).isRequired,
    filterDef: PropTypes.instanceOf(FilterDefinition).isRequired,
    showFilters: PropTypes.bool.isRequired,
}

const EntityTableColumnFilter = ({column, filterDef, showFilters}) => {
    const [filter, setFilter] = useState(filterDef.getPropertyFilterValue(column._property));
    const debouncedFilter = useDebouncedValue(filter, 500);
    
    useEffectExceptOnMount(() => {
        const epf = new PropertyFilter(column._property, ':', debouncedFilter);
        filterDef.setPropertyFilter(epf);
    }, [debouncedFilter]);

    const onChange = (event) => {
        setFilter(event.target.value);
    }

    if (!showFilters) {
        return null;
    }

    var filterInput = null;
    switch(column._filterType) {
        case 'string': 
            filterInput = 
                <Input 
                    type="text" 
                    placeholder={column._title} 
                    name={column._title} 
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