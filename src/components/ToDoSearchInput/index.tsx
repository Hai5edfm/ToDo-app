import { FC } from 'react';

export const ToDoSearchInput: FC = () => {
    return (
        <form>
            <label htmlFor='search-to-do'></label>
            <input name="search-to-do" type="text" placeholder="Search" />
        </form>
    );
}
