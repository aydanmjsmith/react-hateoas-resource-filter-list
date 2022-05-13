import React from 'react';
import PropTypes from 'prop-types';
import EntityTableHeader from './EntityTableHeader';
import EntityTableBody from './EntityTableBody';
import FilterDefinition from '../../classes/filter/FilterDefinition';
import TableDefinition from '../../classes/table/TableDefinition';
import { Table } from 'reactstrap';

const EntityTable = ({tableDef, filterDef, showFilters, entities}) => {
    return (
        <React.Fragment>
            <div className="mt-1 border table-responsive">
                <Table striped hover>
                    <EntityTableHeader 
                        tableDef={tableDef}
                        filterDef={filterDef}
                        showFilters={showFilters}/>
                    <EntityTableBody 
                        tableDef={tableDef}
                        filterDef={filterDef}
                        entities={entities} />
                </Table>
            </div>
        </React.Fragment>
    );
}

export default EntityTable;

EntityTable.propTypes = {
    tableDef: PropTypes.instanceOf(TableDefinition).isRequired,
    filterDef: PropTypes.instanceOf(FilterDefinition).isRequired,
    showFilters: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.object).isRequired,
}