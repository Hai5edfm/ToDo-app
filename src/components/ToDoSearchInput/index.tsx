import { FC, useEffect, useState } from 'react';

import '../../styles/components/_ToDoSearchInput.scss';

type ToDoSearchProps = {
    searchToDo: (text: string) => void,
    showAllToDos: () => void,
    iconFunctionalities?: React.ReactNode[],
}

export const ToDoSearchInput: FC<ToDoSearchProps> = ({
    searchToDo, 
    showAllToDos,
    iconFunctionalities = [],
}: ToDoSearchProps
) => {
    const [searchText, setSearchText] = useState('');
    const searchInput = document.getElementById('search-to-do') as HTMLInputElement;

    useEffect(() => {
        if(searchText === '') {
            showAllToDos()
        } else {
            searchToDo(searchInput.value)
        }
    } , [searchText]);

    return (
        <form
            action='#'
            className="search-to-do"
        >
            <div className='search-to-do__input-container'>
                <label 
                    htmlFor="search-to-do" 
                    className="search-to-do__label"
                >
                    Search ToDos
                </label>
                <div className="search-to-do__input">
                    <input 
                        id="search-to-do"
                        name="search-to-do"
                        type="text"
                        placeholder="Search" 
                        autoComplete='off'
                        onChange={e => setSearchText(e.target.value)}
                    />
                </div>
            </div>
            {iconFunctionalities && iconFunctionalities.length > 0 && (
                <div className="search-to-do__functionalities">
                    {iconFunctionalities}
                </div>
            )}
        </form>
    );
}
