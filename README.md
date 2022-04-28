# react hateoas resource filter list

## Description 

A react library that renders a filterable, sortable and pageable table that represents a HATEOAS resource that exposes a list.

[![NPM](https://img.shields.io/npm/v/entity-filter-components.svg)](https://www.npmjs.com/package/entity-filter-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-hateoas-resource-filter-list
```

## Usage

```jsx
import React from "react";

import { EntityFilterList } from "react-hateoas-resource-filter-list";
import { EntityTableDefinition } from "react-hateoas-resource-filter-list";

const ResourceList = () => {
    return (
        <React.Fragment>
            <EntityFilterList 
                tableDef={tableDef}
                resourceUrl={resourceUrl}
                paged={true} />
        </React.Fragment>
    );
};
```

## License

ISC © [aydanmjsmith](https://github.com/aydanmjsmith)