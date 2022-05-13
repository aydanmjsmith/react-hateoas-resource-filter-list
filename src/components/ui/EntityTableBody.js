import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import TableDefinition from '../../classes/table/TableDefinition';
import FilterDefinition from '../../classes/filter/FilterDefinition';

const EntityTableBody = ({tableDef, filterDef, entities}) => {
    let  rowKey = 0;

    const refreshTable = () => {
        filterDef.filter();
    }

    return (
        <React.Fragment>
            <tbody>
                { entities.length < 1 
                    ?   <tr>
                            <td colSpan={tableDef._columns.length + 1}><span className="fw-bold">No results</span></td>
                        </tr>
                    : tableDef.buildRows(entities, refreshTable).map((entityRow) => 
                        <EntityTableRow 
                            key={rowKey ++} 
                            filterDef={filterDef}
                            entityRow={entityRow}/>)
                }
            </tbody>
        </React.Fragment>
    );
}

export default EntityTableBody;

EntityTableBody.propTypes = {
    tableDef: PropTypes.instanceOf(TableDefinition).isRequired,
    filterDef: PropTypes.instanceOf(FilterDefinition).isRequired,
    entities: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const EntityTableRow = ({entityRow}) => {
    let  cellKey = 0;
    
    return (
        <React.Fragment>
            <tr>
                { entityRow._cells.map((cell) => 
                    cell._onclickFunc 
                        ? <td key={cellKey ++} onClick={cell._onclickFunc} style={{cursor: "pointer"}}>{cell._value}</td>
                        : <td key={cellKey ++}>{cell._value}</td>)
                }
                <td key={cellKey ++} style={{width: "60px"}}> 
                    { entityRow._editFunc ?
                        <FontAwesomeIcon 
                            onClick={entityRow._editFunc} 
                            style={{cursor: "pointer"}} 
                            icon={faEdit} 
                            data-bs-toggle="tooltip" 
                            title="edit row"
                            size="sm" /> : null 
                    }
                    &nbsp;
                    { entityRow._deleteFunc ? 
                        <FontAwesomeIcon 
                            onClick={entityRow._deleteFunc} 
                            style={{cursor: "pointer"}} 
                            icon={faTrashAlt} 
                            data-bs-toggle="tooltip"
                            title="delete row" 
                            size="sm" /> : null
                    }
                </td>
            </tr>
        </React.Fragment>
    );
}