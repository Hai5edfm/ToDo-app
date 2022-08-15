import React, { FC } from "react";
import { ToDo } from "../../customTypes/ToDo";

import '../../styles/components/_ErrorMessage.scss';

type Props = {
    toDos: Array<ToDo>,
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>,
}

export const ErrorMessage: FC<Props> = ({
    toDos,
    setEditingToDos,
}: Props) => {
    return (
        <React.Fragment>
            {toDos.length === 0 &&
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
        </React.Fragment>
    );
}

