import React from "react";
import axios from "axios";
import { EntityFunctions, EntityList } from "react-hateoas-resource-filter-list";
import { TableDefinition } from "react-hateoas-resource-filter-list";
import { Column } from "react-hateoas-resource-filter-list";
import { FunctionDefinition } from "react-hateoas-resource-filter-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
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
            <h1>Entity List Example</h1>
            <EntityList
                tableDef={tableDef}
                resourceUrl={resourceUrlWithParams}
                getEntities={(filterUrl) => getEntities(filterUrl)}
                paged={true} />
        </React.Fragment>
    );
};

export default JobList;

const deleteFunc = async ({args, callback}) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`deleteFunc called with arguments:\n${argString}`);
    callback();
}

const editFunc = async ({args, callback}) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`editFunc called with arguments:\n${argString}`);
    callback();
}

const addFunc = ({args, callback}) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`addFunc called`);
    callback();
}

const onclickFunc = async ({args, callback}) => {
    var argString = '';
    args.forEach(arg => argString = `${argString}\n${arg}`);
    alert(`onclickFunc called with arguments:\n${argString}`);
    callback();
}

const colFormatFunc = (colValue) => {
    return `formated ${colValue}`;
};

const buildTableDef = () => {
    const ref = new Column("reference", "jobRef", "string");
    const title = new Column("title", "title", "string");
    const customer = new Column("customer", "customerFullName", "string");
    
    ref.onclickFunc = new FunctionDefinition(onclickFunc, "_links.self.href", "jobRef");
    customer.formatFunc = colFormatFunc;

    const functions = new EntityFunctions();
    functions.deleteFunc = new FunctionDefinition(deleteFunc, "_links.self.href", "jobRef", "title");
    functions.editFunc = new FunctionDefinition(editFunc, "_links.self.href");
    functions.addFunc = addFunc;

    return new TableDefinition('Jobs', [ref, title, customer], functions);
}