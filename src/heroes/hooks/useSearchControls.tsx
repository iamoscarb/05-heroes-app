import { useRef } from "react";
import { useSearchParams } from "react-router";

export const useSearchControls = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams({});

    const setQueryParams = (name: string, value: string) => {
        setSearchParams((prev) => {
            prev.set(name, value);
            return prev;
        })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value = inputRef.current?.value ?? '';
            setQueryParams('name', value)
        }
    }

    const handleSelected = (param: string, value: string) => {
        if (value === 'all' || value === '0') {
            clearFilter(param)
            return
        }
        setQueryParams(param, value);
    }

    const handleOrderBy = (initialValue: string) => {
        const isOrderByAsc = initialValue.toLowerCase() === 'asc';
        const value = isOrderByAsc ? 'desc' : 'asc';
        setQueryParams('order', value);
    }

    const clearFilter = (param: string) => {
        setSearchParams((prev) => {
            prev.delete(param);
            return prev
        });
    }

    const clearAllFilters = () => {
        setSearchParams((prev) => {
            prev.delete('team');
            prev.delete('category');
            prev.delete('universe');
            prev.delete('status');
            prev.set('strength', '0')
            return prev
        });
    }

    return (
        {
            inputRef,
            searchParams,
            setQueryParams,
            setSearchParams,
            handleKeyDown,
            handleSelected,
            handleOrderBy,
            clearAllFilters
        }

    )
}
