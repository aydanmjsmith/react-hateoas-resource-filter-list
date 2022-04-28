import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import EntityTableHeader from './EntityTableHeader';
import EntityTableBody from './EntityTableBody';
import EntityFilterDefinition from '../../classes/filter/EntityFilterDefinition';
import EntityTableDefinition from '../../classes/table/EntityTableDefinition';

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
                        entities={entities}/>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default EntityTable;

EntityTable.propTypes = {
    tableDef: PropTypes.instanceOf(EntityTableDefinition).isRequired,
    filterDef: PropTypes.instanceOf(EntityFilterDefinition).isRequired,
    showFilters: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.object).isRequired,
}