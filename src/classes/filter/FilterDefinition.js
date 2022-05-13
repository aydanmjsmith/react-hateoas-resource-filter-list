import { PropertyFilter } from "./PropertyFilter";

export class FilterDefinition {
    // Constants
    static get PAGE_PARAM() { return 'page'; }
    static get SIZE_PARAM() { return 'size'; }
    static get FILTER_PARAM() { return 'filter'; }
    static get SORT_PARAM() { return 'sort'; }

    /**
     * @param {String} resourceUrl
     * @param {Function} getEntities
     * @param {Function} setResult
     * @param {boolean} paged
     */
    constructor(resourceUrl, getEntities, setResult, paged) {
        const url = new URL(resourceUrl);

        if (paged) {
            if (!url.searchParams.has(FilterDefinition.PAGE_PARAM)) {
                url.searchParams.set(FilterDefinition.PAGE_PARAM, 0); 
                url.searchParams.set(FilterDefinition.SIZE_PARAM, 10);
            }
        } else {
            if (url.searchParams.has(FilterDefinition.PAGE_PARAM)) {
                url.searchParams.delete(FilterDefinition.PAGE_PARAM, 0); 
                url.searchParams.delete(FilterDefinition.SIZE_PARAM, 10);
            }
        }

        if (url.searchParams.has(FilterDefinition.FILTER_PARAM)) {
            const fsp = url.searchParams.get(FilterDefinition.FILTER_PARAM) + ",";
            const matches = fsp.matchAll(/(\w.+?)(:|<|>)([\w,. ]+?),/g);
            const filters = [];
            for (const match of matches) {
                filters.push(new PropertyFilter(match[1], match[2], match[3]));
            }
            this._propertyFilters = filters;
        } else {
            url.searchParams.set(FilterDefinition.FILTER_PARAM, '');
            this._propertyFilters = [];
        }

        if (!url.searchParams.has(FilterDefinition.SORT_PARAM)) {
            url.searchParams.set(FilterDefinition.SORT_PARAM, ''); 
        }

        this._filterUrl = url;
        this._getEntities = getEntities;
        this._setResult = setResult;
        this._paged = paged;

        this.filter();
    }

    /**
     * setter for _propertyFilters
     * 
     * @param {Array.<PropertyFilter>} propertyFilters
     */
     set propertyFilters(propertyFilters) {
        this._propertyFilters = propertyFilters
    }

    /**
     * @param {number} size page size
     */
    setPageSize(size) {
        if (this._paged) {
            this._filterUrl.searchParams.set(FilterDefinition.PAGE_PARAM, 0); 
            this._filterUrl.searchParams.set(FilterDefinition.SIZE_PARAM, size);
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
        this._filterUrl.searchParams.set(FilterDefinition.SORT_PARAM, sort);
        this.filter();
    }

    /**
     * @param {PropertyFilter} propertyFilter 
     */
    setPropertyFilter(propertyFilter) {
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

        this._filterUrl.searchParams.set(FilterDefinition.FILTER_PARAM, filterUrlParams.slice(1));
        if (this._paged) {
            this._filterUrl.searchParams.set(FilterDefinition.PAGE_PARAM, 0); 
        }
        
        this.filter();
    }

    async filter() {
        const data = await this._getEntities(this._filterUrl.href);
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

export default FilterDefinition;