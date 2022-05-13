import React from "react";
import axios from "axios";
import { EntityCustomList } from "react-hateoas-resource-filter-list";
import { FunctionDefinition } from "react-hateoas-resource-filter-list";
import { CustomListDefinition } from "react-hateoas-resource-filter-list";
import { EntityFunctions } from "react-hateoas-resource-filter-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobCustomList = ()  => {
    const resourceUrl = 'http://localhost:8080/api/jobs/';

    const getEntities = async (filterUrl) => {
        try {
            const response = await axios.get(filterUrl);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const build = (entity, editEntity, deleteEntity) => {
        return (
            <CustomListItem
                key={entity.jobRef}
                entity={entity}
                editEntity={editEntity}
                deleteEntity={deleteEntity}
            />
        );
    }

    const buildCustomDef = () => {
        const entityFuncs = new EntityFunctions();
        entityFuncs.deleteFunc = new FunctionDefinition(deleteFunc, "_links.self.href", "jobRef", "title");
        entityFuncs.editFunc = new FunctionDefinition(editFunc, "_links.self.href");
        entityFuncs.addFunc = addFunc;
    
        return new CustomListDefinition('Jobs', build, entityFuncs);
    }

    return (
        <React.Fragment>
            <h1>Entity Custom List Example</h1>
            <EntityCustomList 
                resourceUrl={resourceUrl}
                getEntities={getEntities}
                customListDef={buildCustomDef()} 
                paged={true} />
        </React.Fragment>
    );
}

export default JobCustomList;

const CustomListItem = ({entity, editEntity, deleteEntity}) => {
    return (
        <React.Fragment>
            <div className='col-4 p-1'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col"><span className="fw-bold text-wrap">{entity.jobRef}</span></div>
                        <div className="col col-auto float-end">
                            <button onClick={() => editEntity()}>edit</button>
                            &nbsp;
                            <button onClick={() => deleteEntity(true)}>delete</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p>{entity.title}</p>
                    <p>{entity.description}</p>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

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