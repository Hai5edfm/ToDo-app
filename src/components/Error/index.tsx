import React, { FC } from "react";
import { ToDo } from "../../customTypes/ToDo";

import '../../styles/components/_ErrorMessage.scss';

type Props = {
    toDos: Array<ToDo>,
    localToDos: ToDo[] | [];
    query: string;
    selectedFilter: 'all' | 'pending' | 'done';
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>,
}

export const ErrorMessage: FC<Props> = ({
    toDos,
    localToDos,
    query,
    selectedFilter,
    setEditingToDos,
}: Props) => {
    const tabDoneQuery = selectedFilter === 'done'
                ? 'No completed tasks.'
                : `No results for “${query}”.`
    const tabPendingQuery = selectedFilter === 'pending'
                ? 'No pending tasks.'
                : tabDoneQuery;

    const noResultsMessage = query
        ? `No results for “${query}”.`
        : tabPendingQuery;

    return (
        <React.Fragment>
            {localToDos.length === 0 &&
                <div className="error-container error-message">
                    <h2>Oops!</h2>
                    <p>It seems you haven't added any toDos yet, <button onClick={() => setEditingToDos('add')}>
                            <em>
                                 add your first toDo
                            </em>
                        </button>
                    </p>
                </div>
            }
            {(toDos.length === 0 && localToDos.length !== 0) &&
                <h3 className="error-container" role='status' aria-live='polite'>
                    {noResultsMessage}
                </h3>
            }
        </React.Fragment>
    );
}

