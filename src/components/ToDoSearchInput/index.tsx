import { FC, useEffect, useState } from 'react';

import '../../styles/components/_ToDoSearchInput.scss';
import { SearchIcon } from '../Icons/SearchIcon';

type ToDoSearchProps = {
    searchToDo: (text: string) => void,
    showAllToDos: () => void,
}

export const ToDoSearchInput: FC<ToDoSearchProps> = (
    { searchToDo, showAllToDos }: ToDoSearchProps
) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        const searchInput = document.getElementById('search-to-do') as HTMLInputElement;
        e.preventDefault();

        searchToDo(searchInput.value);
    }
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value !== '' ? setSearchText(e.target.value) : setSearchText('');
    }

    useEffect(() => {
        if(searchText === '') {
            showAllToDos()
        }
    } , [searchText]);

    return (
        <form className='search-to-do' onSubmit={handleSearch}>
            <label htmlFor='search-to-do' className='search-to-do__label'>Search ToDos</label>
            <div className='search-to-do__input'>
                <input id="search-to-do" name="search-to-do" type="text" placeholder="Search" onChange={handleSearchTextChange}/>
                <button type="submit">
                    <SearchIcon fill="#eee"/>
                </button>
            </div>
        </form>
    );
}
