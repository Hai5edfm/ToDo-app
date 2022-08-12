import { FC } from 'react';

import '../../styles/components/_ToDoSearchInput.scss';
import { SearchIcon } from '../Icons/SearchIcon';

type ToDoSearchProps = {
    searchToDo: (text: string) => void;
}

export const ToDoSearchInput: FC<ToDoSearchProps> = (
    { searchToDo }: ToDoSearchProps
) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-to-do') as HTMLInputElement;

        searchToDo(searchInput.value);
        searchInput.value = '';
    }

    return (
        <form className='search-to-do' onSubmit={handleSearch}>
            <label htmlFor='search-to-do' className='search-to-do__label'>Search ToDos</label>
            <div className='search-to-do__input'>
                <input id="search-to-do" name="search-to-do" type="text" placeholder="Search" onChange={() => handleSearch}/>
                <button type="submit">
                    <SearchIcon fill="#eee"/>
                </button>
            </div>
        </form>
    );
}
