import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, PaginationItem, PaginationLink, InputGroup, Label, Input } from 'reactstrap';
import EntityFilterDefinition from '../../classes/filter/EntityFilterDefinition';

const EntityPageControls = ({filterDef, page, links}) => {
    const onChangePageSize = (event) => {
        filterDef.setPageSize(event.target.value);
    }

    if (!page) {
        return null;
    }
    
    return (
        <React.Fragment>
            <Row className="py-2 m-0 mt-1 bg-light border d-flex justify-content-between align-items-center">
                <Col className="col-auto">
                     <span className="">page {page.totalPages < 1 ? 0 : page.number + 1} of {page.totalPages}</span>
                </Col>
                <Col className="col-auto">
                    <InputGroup size="sm">
                        <Label for="pageSize"><span className="">page size&nbsp;</span></Label>
                        <Input type="select" name="pageSize" bsSize='sm' onChange={onChangePageSize} value={page.size} >
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </Input>
                    </InputGroup>
                </Col>
                <Col className="col-auto">
                    <Pagination style={{ margin: 0}}>
                        <PaginationItem disabled={page.number === 0 ? true : false}>
                            <PaginationLink first 
                                onClick={() => filterDef.setPage(links.first.href)} 
                                data-bs-toggle="tooltip"
                                title="first page" />
                        </PaginationItem>
                        <PaginationItem disabled={page.number === 0 ? true : false}>
                            <PaginationLink previous 
                                onClick={() => filterDef.setPage(links.prev.href)} 
                                data-bs-toggle="tooltip"
                                title="previous page" />
                        </PaginationItem>
                        <PaginationItem disabled={page.number + 1 === page.totalPages  ? true : false}>
                            <PaginationLink next 
                                onClick={() => filterDef.setPage(links.next.href)} 
                                data-bs-toggle="tooltip"
                                title="next page" />
                        </PaginationItem>
                        <PaginationItem disabled={page.number + 1 === page.totalPages  ? true : false}>
                            <PaginationLink last 
                                onClick={() => filterDef.setPage(links.last.href)} 
                                data-bs-toggle="tooltip"
                                title="last page" />
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        </React.Fragment>);
}

export default EntityPageControls;

EntityPageControls.propTypes = {
    filterDef: PropTypes.instanceOf(EntityFilterDefinition).isRequired,
    page: PropTypes.shape({
            number: PropTypes.number.isRequired,
            size: PropTypes.number.isRequired,
            totalElements: PropTypes.number.isRequired,
            totalPages: PropTypes.number.isRequired,
    }).isRequired,
    links: PropTypes.shape({
        first: PropTypes.shape({
            href: PropTypes.string.isRequired,
        }),
        last: PropTypes.shape({
            href: PropTypes.string.isRequired,
        }),
        prev: PropTypes.shape({
            href: PropTypes.string.isRequired,
        }),
        next: PropTypes.shape({
            href: PropTypes.string.isRequired,
        }),
        self: PropTypes.shape({
            href: PropTypes.string.isRequired,
        }),
    }),
}