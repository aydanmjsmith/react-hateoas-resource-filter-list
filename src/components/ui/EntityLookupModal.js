import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import LookupInputProperty from '../../classes/lookup/LookupInputProperty';
import EntityPropertyFilter from '../../classes/filter/EntityPropertyFilter';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount';
import useEntityFilter from '../../hooks/useEntityFilter';
import { Modal, ModalHeader, ModalBody, Form, Input, Button, FormGroup, Label, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

const EntityLookupModal = ({isOpen, close, select, entityName, properties, resourceUrl, getEntities}) => {
    const [selectedEntity, setSelectedEntity] = useState(null);
    const {result, filterDef} = useEntityFilter(resourceUrl, getEntities, true);

    useEffect(() => {
        if (!isOpen) {
            setSelectedEntity(null);
        }
    }, [isOpen]);

    const onSubmit = async (event) => {
        event.preventDefault();
        select(selectedEntity);
        close();
    }

    if (!filterDef) {
        return null;
    }

    const entities = result._embedded ? Object.values(result._embedded)[0] : [];
    let propertyKey = 0;
    
    return(
        <React.Fragment>
            <Modal isOpen={isOpen}>
                <ModalHeader className="bg-light" toggle={() => close()}>
                    <FontAwesomeIcon icon={faSearch} size="sm" />&nbsp;find {entityName}
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            { properties.map(prop => 
                                <Col className="col-12 col-sm-6" key={propertyKey++}>
                                    <FormGroup>
                                        <Label for={prop._name}>{prop._title}</Label>
                                        <FilterInput
                                            property={prop}
                                            filterDef={filterDef} />
                                    </FormGroup>
                                </Col>)}
                        </Row>
                        <hr />
                        <FormGroup>
                            <FilterResultSelect 
                                properties={properties}
                                setSelectedEntity={(entity) => setSelectedEntity(entity)}
                                entities={entities} />
                        </FormGroup>
                        <hr />
                        <Row className="float-end">
                            <Col className="col-auto">
                                <Button 
                                    disabled={selectedEntity ? false : true } 
                                    color="primary" 
                                    size="sm">
                                    <FontAwesomeIcon icon={faCheck} size="sm" />&nbsp;continue
                                </Button>
                                &nbsp;
                                <Button size="sm" onClick={() => close()} >
                                    <FontAwesomeIcon icon={faTimesCircle} size="sm" />&nbsp;cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>);
};

export default EntityLookupModal;

EntityLookupModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    entityName: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.instanceOf(LookupInputProperty)).isRequired,
    resourceUrl: PropTypes.string.isRequired,
    getEntities: PropTypes.func.isRequired,
}

const FilterInput = ({filterDef, property}) => {
    const [filter, setFilter] = useState(filterDef.getPropertyFilterValue(property._name));
    const debouncedFilter = useDebouncedValue(filter, 500);

    useEffectExceptOnMount(() => {
        const epf = new EntityPropertyFilter(property._name, ':', debouncedFilter);
        filterDef.setPropertyFilter(epf);
    }, [debouncedFilter]);

    const onChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <Input 
            placeholder={`filter ${property._title}`}
            name={property._name} 
            type="text" 
            onChange={onChange} 
            value={filter} />
    );
};

const FilterResultSelect = ({entities, properties, setSelectedEntity}) => {
    var options = null;
    if (entities) {
        options = 
            entities.map((entity) => 
                <option key={entity.id} value={entity.id}>
                    {properties.map(p => `${entity[p._name]} `)}
                </option>
            );
    }

    const onSelect = (event) => {
        const id = event.target.value
        setSelectedEntity(entities.find(entity => entity.id == id));
    }

    return (
        <Input 
            multiple 
            type="select" 
            name="entities" 
            onChange={onSelect} >
                {options}
        </Input>
    );
};