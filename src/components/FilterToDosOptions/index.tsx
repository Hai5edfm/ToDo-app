import React, { FC, useRef } from 'react';
import '../../styles/components/_FilterToDosOptions.scss';

export type ToDoFilter = 'all' | 'pending' | 'done';

type FilterToDosOptionsProps = {
    selectedFilter: ToDoFilter,
    onFilterChange: (filter: ToDoFilter) => void,
}

const tabs: Array<{ filter: ToDoFilter; label: string }> = [
    { filter: 'all', label: 'All' },
    { filter: 'pending', label: 'Pending' },
    { filter: 'done', label: 'Done' },
];

export const FilterToDosOptions: FC<FilterToDosOptionsProps> = ({
    selectedFilter,
    onFilterChange,
}) => {
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
        let nextIndex: number | undefined;

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = (currentIndex + 1) % tabs.length;
                break;
            case 'ArrowLeft':
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        const nextFilter = tabs[nextIndex].filter;
        tabRefs.current[nextIndex]?.focus();
        onFilterChange(nextFilter);
    };

    return (
        <div className="filter-tabs" role="tablist" aria-label="Task status">
            {tabs.map(({ filter, label }, index) => (
                <button
                    key={filter}
                    ref={element => { tabRefs.current[index] = element; }}
                    type="button"
                    id={`todo-tab-${filter}`}
                    role="tab"
                    aria-selected={selectedFilter === filter}
                    aria-controls="todo-tabpanel"
                    tabIndex={selectedFilter === filter ? 0 : -1}
                    onClick={() => onFilterChange(filter)}
                    onKeyDown={event => handleKeyDown(event, index)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
