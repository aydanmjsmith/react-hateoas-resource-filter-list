import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EntityTableDefinition from '../../classes/table/EntityTableDefinition';

const EntityTableBody = ({tableDef, entities}) => {
    let  rowKey = 0;
    return (
        <React.Fragment>
            <tbody>
                { entities.length < 1 
                    ?   <tr>
                            <td colSpan={tableDef._columnDefs.length + 1}><span className="fw-bold">No results</span></td>
                        </tr>
                    : tableDef.buildRows(entities).map((entityRow) => 
                        <EntityTableRow 
                            key={rowKey ++} 
                            entityRow={entityRow} />)
                }
            </tbody>
        </React.Fragment>
    );
}

export default EntityTableBody;

EntityTableBody.propTypes = {
    tableDef: PropTypes.instanceOf(EntityTableDefinition).isRequired,
    entities: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const EntityTableRow = ({entityRow}) => {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    let  columnKey = 0;

    console.log("entityRow");
    console.log(entityRow);

    return (
        <React.Fragment>
            <ConfirmDeleteModal 
                isOpen={confirmDeleteOpen}
                success={() => { setConfirmDeleteOpen(false); entityRow._deleteFunc(); }}   
                cancel={() => setConfirmDeleteOpen(false)} />
            <tr>
                { entityRow._columns.map((column) => 
                    column._onclickFunc 
                        ? <td key={columnKey ++} onClick={column._onclickFunc} style={{cursor: "pointer"}}>{column._value}</td>
                        : <td key={columnKey ++}>{column._value}</td>)
                }
                <td key={columnKey ++} style={{width: "60px"}}> 
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
                            onClick={() => setConfirmDeleteOpen(true)} 
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

const ConfirmDeleteModal = (props) => {
    return (
        <React.Fragment>
           <Modal isOpen={props.isOpen} className="modal-fullscreen-md-down">
                <ModalHeader className="bg-light" toggle={props.cancel}><FontAwesomeIcon icon={faTrashAlt} size="sm" />&nbsp;confirm delete</ModalHeader>
                <ModalBody>Are you sure you wish to delete this item?</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => props.success()}>
                        <FontAwesomeIcon icon={faCheck} size="sm" />&nbsp;continue
                    </Button>
                    <Button size="sm" onClick={() => props.cancel()}>
                        <FontAwesomeIcon icon={faTimesCircle} size="sm" />&nbsp;cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>);
}