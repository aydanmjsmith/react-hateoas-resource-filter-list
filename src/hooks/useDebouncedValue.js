import { useState, useEffect } from 'react';

const useDebouncedValue = (value, wait) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebouncedValue(value), wait);
        return () => clearTimeout(id);
    }, [value]);
    
    return debouncedValue;
}

export default useDebouncedValue;