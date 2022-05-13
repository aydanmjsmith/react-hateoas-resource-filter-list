import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faFilter, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FilterDefinition } from '../../classes/filter/FilterDefinition';
import { EntityFunctions } from '../../classes';

const EntityListTitle = ({title, functions, filterDef, page, toggleFiltersFunc}) => {
    var pageDesc;

    if (page) {
        const start = (page.number * page.size) + 1;
        const end = start + page.size > page.totalElements ? page.totalElements : start + page.size;
        pageDesc = `showing ${start} to ${end} of ${page.totalElements} entries`;
    }

    const refreshTable = () => {
        filterDef.filter();
    }

    const addRow = async () => {
        functions._addFunc({args: [], callback: refreshTable});
    }

    return (
        <React.Fragment>
            <Row className="py-2 m-0 mt-1 bg-light border d-flex justify-content-between">
                { functions._title ? 
                    <Col className="col-auto">
                        <span className="fs-5 fw-bold">
                            <FontAwesomeIcon icon={faList} size="sm" />&nbsp;{title}
                        </span>
                    </Col> : null
                }
                { page ?   
                    <Col className="col-auto">
                        <span className="fs-5 fw-bold">{pageDesc}</span>
                    </Col> : null
                }
                <Col className="col-auto">
                    { functions.hasAddFunc() ? 
                        <span>
                            <Button 
                                size="sm" 
                                color="primary" 
                                onClick={() => addRow()}
                                data-bs-toggle="tooltip" 
                                title="add new table item">
                                    <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            &nbsp;
                        </span> : null 
                    }
                    { toggleFiltersFunc ?
                        <span>
                            <Button 
                                size="sm" 
                                color="primary" 
                                onClick={() => toggleFiltersFunc()}
                                data-bs-toggle="tooltip" 
                                title="toggle table filters">
                                    <FontAwesomeIcon icon={faFilter} />
                            </Button>
                            &nbsp;
                        </span> : null 
                    }
                    <Button 
                        size="sm" 
                        color="primary" 
                        onClick={() => refreshTable()}
                        data-bs-toggle="tooltip" 
                        title="refresh table">
                            <FontAwesomeIcon icon={faSyncAlt} />
                    </Button>
                </Col>
            </Row>
        </React.Fragment>);
}

export default EntityListTitle;

EntityListTitle.propTypes = {
    title: PropTypes.string.isRequired,
    functions: PropTypes.instanceOf(EntityFunctions).isRequired,
    filterDef: PropTypes.instanceOf(FilterDefinition).isRequired,
    page: PropTypes.shape({
        number: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        totalElements: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
    }),
    toggleFiltersFunc: PropTypes.func.isRequired,
}