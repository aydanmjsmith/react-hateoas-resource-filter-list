import React from "react";
import axios from "axios";
import { EntityFilterList } from "react-hateoas-resource-filter-list";
import { EntityTableDefinition } from "react-hateoas-resource-filter-list";
import { EntityColumnDefinition } from "react-hateoas-resource-filter-list";
import { EntityFunctionDefinition } from "react-hateoas-resource-filter-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobSearch = () => {
    const tableDef = buildTableDef();
    //const resourceUrl = 'http://localhost:8080/api/jobs/';
    const resourceUrlWithParams 
        = 'http://localhost:8080/api/jobs/?filter=jobRef%3A02%2Ctitle%3Athis%2CcustomerFullName%3AAyd&page=11&size=5&sort=title,desc';

    const getEntities = async (filterUrl) => {
        try {
            const response = await axios.get(filterUrl);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <EntityFilterList 
                tableDef={tableDef}
                resourceUrl={resourceUrlWithParams}
                getEntities={(filterUrl) => getEntities(filterUrl)}
                paged={true} />
        </React.Fragment>
    );
};

export default JobSearch;

const deleteFunc = async (args) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`deleteFunc called with arguments:\n${argString}`);
}

const editFunc = async (args) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`editFunc called with arguments:\n${argString}`);
}

const addFunc = async () => {
    alert(`addFunc called`);
}

const onclickFunc = async (args) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`onclickFunc called with arguments:\n${argString}`);
}

const colFormatFunc = (colValue) => {
    return `formated ${colValue}`;
};

const buildTableDef = () => {
    const refColDef = new EntityColumnDefinition("reference", "jobRef", "string");
    const titleColDef = new EntityColumnDefinition("title", "title", "string");
    const customerColDef = new EntityColumnDefinition("customer", "customerFullName", "string");
    
    refColDef.onclickFunc = new EntityFunctionDefinition(onclickFunc, "_links.self.href", "jobRef");
    customerColDef.formatFunc = colFormatFunc;
        
    const tableDef = new EntityTableDefinition('Jobs', [refColDef, titleColDef, customerColDef]);
    tableDef.deleteFunc = new EntityFunctionDefinition(deleteFunc, "_links.self.href", "jobRef", "title");
    tableDef.editFunc = new EntityFunctionDefinition(editFunc, "_links.self.href");
    tableDef.addFunc = () => addFunc();

    return tableDef;
}