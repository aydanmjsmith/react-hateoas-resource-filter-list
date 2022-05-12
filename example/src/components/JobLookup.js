import React, { useState } from "react";
import axios from "axios";
import { EntityLookupModal } from "react-hateoas-resource-filter-list";
import { LookupInputProperty } from "react-hateoas-resource-filter-list";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobLookup = (props)  => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectJob, setSelectJob] = useState('');
    const resourceUrl = 'http://localhost:8080/api/jobs/lookup';

    const ref = new LookupInputProperty('jobRef', 'job ref');
    const title = new LookupInputProperty('title', 'title');

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
            <EntityLookupModal 
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                select={setSelectJob}
                entityName={'jobs'}
                properties={[ref, title]}
                resourceUrl={resourceUrl}
                getEntities={getEntities} />
            <h1>Entity Lookup Example</h1>
            <p>
                <span className="fw-bold">{selectJob ? selectJob.jobRef : 'no job selected'} </span>
                <button onClick={() => setIsModalOpen(true)} >lookup job</button>
            </p>
        </React.Fragment>
    );
}

export default JobLookup;