import { EntityPropertyFilter } from "./EntityPropertyFilter";

export class EntityFilterDefinition {
    /**
     * @param {String} resourceUrl
     * @param {Function} getEntities
     * @param {Function} setResult
     * @param {boolean} paged
     */
    constructor(resourceUrl, getEntities, setResult, paged) {
        const url = new URL(resourceUrl);
        if (paged) {
            url.searchParams.set('page', 0); 
            url.searchParams.set('size', 10);
        } 
        url.searchParams.set('filter', '');
        url.searchParams.set('sort', ''); 

        this._filterUrl = url;
        this._getEntities = getEntities;
        this._setResult = setResult;
        this._paged = paged;
        this._propertyFilters = [];

        this.filter();
    }

    /**
     * setter for _propertyFilters
     * 
     * @param {Array.<EntityPropertyFilter>} propertyFilters
     */
     set propertyFilters(propertyFilters) {
        this._propertyFilters = propertyFilters
    }

    /**
     * @param {number} size page size
     */
    setPageSize(size) {
        if (this._paged) {
            this._filterUrl.searchParams.set('page', 0); 
            this._filterUrl.searchParams.set('size', size);
        }
        this.filter();
    }

    /**
     * @param {String} pageUrl page url
     */
    setPage(pageUrl) {
        if (this._paged) {
            this._filterUrl = new URL(pageUrl);
        }
        this.filter();
    }

    /**
     * @param {String} sort sort string 
     */
    setSort(sort) {
        this._filterUrl.searchParams.set('sort', sort);
        this.filter();
    }

    /**
     * @param {EntityPropertyFilter} propertyFilter 
     */
    setPropertyFilter(propertyFilter) {
        console.log(propertyFilter);

        const updFilters = this._propertyFilters.filter(pf => pf._property != propertyFilter._property);
        if (propertyFilter._value) {
            updFilters.push(propertyFilter);
        }

        this._propertyFilters = updFilters;

        let filterUrlParams = '';
        this._propertyFilters.forEach(pf => filterUrlParams = `${filterUrlParams},${pf.buildFilterUrlParam()}`);
        if (filterUrlParams.length > 0) {
            filterUrlParams.slice(1);
        }

        this._filterUrl.searchParams.set('filter', filterUrlParams.slice(1));
        if (this._paged) {
            this._filterUrl.searchParams.set('page', 0); 
        }
        
        this.filter();
    }

    async filter() {
        const data = await this._getEntities(this._filterUrl);
        this._setResult(data ? data : {});
    }

    /**
     * @param {String} property
     * @returns filter value
     */
     getPropertyFilterValue(property) {
        const pf = this._propertyFilters.find(f => f._property === property);
        return pf ? pf._value : '';
    }
}

export default EntityFilterDefinition;