import { FC, useRef } from 'react';
import { CrossIcon } from '../Icons/CrossIcon';
import '../../styles/components/_ToDoSearchInput.scss';

type ToDoSearchProps = {
    searchText: string,
    searchToDo: (text: string) => void,
    clearSearchText: () => void,
    searchIcon?: React.ReactNode,
}

export const ToDoSearchInput: FC<ToDoSearchProps> = ({
    searchText,
    searchToDo,
    clearSearchText,
    searchIcon,
}: ToDoSearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const clearSearch = () => {
        clearSearchText();
        inputRef.current?.focus();
    };

    return (
        <form
            className="search-to-do"
            onSubmit={event => event.preventDefault()}
        >
            <div className="search-to-do__input-container">
                <label htmlFor="search-to-do" className="search-to-do__label">
                    Search ToDos
                </label>
                <div className="search-to-do__input">
                    <input
                        ref={inputRef}
                        id="search-to-do"
                        name="search-to-do"
                        type="text"
                        placeholder="Search"
                        autoComplete="off"
                        value={searchText}
                        onChange={event => searchToDo(event.target.value)}
                    />
                    {searchText !== '' && (
                        <button
                            type="button"
                            className="search-to-do__clear"
                            aria-label="Clear search"
                            onMouseDown={event => event.preventDefault()}
                            onClick={clearSearch}
                        >
                            <CrossIcon width={14} height={14} />
                        </button>
                    )}
                    {searchIcon}
                </div>
            </div>
        </form>
    );
};
