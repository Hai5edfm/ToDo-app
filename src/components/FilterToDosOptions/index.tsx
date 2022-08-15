import React, { FC } from 'react';
import '../../styles/components/_FilterToDosOptions.scss';

type FilterToDosButtonProps = {
    showAllToDos: () => void,
    showActiveToDos: () => void,
    showCompletedToDos: () => void,
    filtering: boolean,
}


export const FilterToDosOptions: FC<FilterToDosButtonProps> = ({
    showAllToDos,
    showActiveToDos,
    showCompletedToDos,
    filtering
}: FilterToDosButtonProps) => {
    return (
        <React.Fragment>
            {filtering === true &&
                <ul className='filter-list'>
                    <li>
                        <button onClick={() => showAllToDos()}>All</button>
                    </li>
                    <li>
                        <button onClick={() => showActiveToDos()}>Active</button>
                    </li>
                    <li>
                        <button onClick={() => showCompletedToDos()}>Completed</button>
                    </li>
                </ul>
            }
        </React.Fragment>
    )
}

