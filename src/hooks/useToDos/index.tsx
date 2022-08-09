import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';

export const useToDos = () => {
	const [toDos, setToDos] = useState<ToDo[]>([]);

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: toDos.length + 1,
			text,
			completed: false,
		};

		setToDos([...toDos, newToDo]);
	}

	const removeToDo = (id: number) => {
		setToDos(toDos.filter(toDo => toDo.id !== id));
	}

	const toggleToDo = (id: number) => {
		setToDos(toDos.map(toDo => {
			if (toDo.id === id) {
				return {
					...toDo,
					completed: !toDo.completed,
				}
			}
			return toDo;
		}));
	}

	const searchToDo = (text: string) => {
		setToDos(toDos.filter(toDo => toDo.text.includes(text)));
	}

	const showCompletedToDos = () => {
		setToDos(toDos.filter(toDo => toDo.completed));
	}

	const showActiveToDos = () => {
		setToDos(toDos.filter(toDo => !toDo.completed));
	}

	const showAllToDos = () => {
		setToDos(toDos);
	}

	return {
		toDos,
		addToDo,
		removeToDo,
		toggleToDo,
		searchToDo,
		showCompletedToDos,
		showActiveToDos,
		showAllToDos,
	}
}


