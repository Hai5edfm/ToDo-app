import { FC } from 'react';

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
        <form onSubmit={handleSearch}>
            <label htmlFor='search-to-do'></label>
            <input id="search-to-do" name="search-to-do" type="text" placeholder="Search" />
            <button type="submit">Search</button>
        </form>
    );
}
