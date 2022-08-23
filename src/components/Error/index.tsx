import React, { FC } from "react";
import { ToDo } from "../../customTypes/ToDo";

import '../../styles/components/_ErrorMessage.scss';

type Props = {
    toDos: Array<ToDo>,
    localToDos: ToDo[] | [];
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>,
}

export const ErrorMessage: FC<Props> = ({
    toDos,
    localToDos,
    setEditingToDos,
}: Props) => {
    const searchInput = document.getElementById('search-to-do') as HTMLInputElement;
    return (
        <React.Fragment>
            {localToDos.length === 0 &&
                <div className="error-message">
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
                <h3>There is no results for {searchInput.value}</h3> 
            }
        </React.Fragment>
    );
}

