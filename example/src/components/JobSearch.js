import React from "react";
import { EntityFilterList } from "react-hateoas-resource-filter-list";
import { EntityTableDefinition } from "react-hateoas-resource-filter-list";
import { EntityColumnDefinition } from "react-hateoas-resource-filter-list";
import { EntityFunctionDefinition } from "react-hateoas-resource-filter-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobSearch = () => {
    const tableDef = buildJobsTableDef();
    const resourceUrl = 'http://localhost:8080/jobs/';

    return (
        <React.Fragment>
            <EntityFilterList 
                tableDef={tableDef}
                resourceUrl={resourceUrl}
                paged={true} />
        </React.Fragment>
    );
};

export default JobSearch

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

const buildJobsTableDef = () => {
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