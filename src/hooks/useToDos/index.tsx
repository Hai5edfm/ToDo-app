import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';

export const useToDos = () => {
	const localToDos = JSON.parse(window.localStorage.getItem('toDos') || '[]') as ToDo[];
	const [toDos, setToDos] = useState<ToDo[]>(localToDos);

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: toDos.length + 1,
			text,
			isCompleted: false,
		};

		setToDos([...toDos, newToDo]);
		window.localStorage.setItem('toDos', JSON.stringify([...toDos, newToDo]));
	}

	const removeToDo = (id: number) => {
		const newToDos = toDos.filter(toDo => toDo.id !== id);
		setToDos(newToDos);
		window.localStorage.setItem('toDos', JSON.stringify(toDos.filter(toDo => toDo.id !== id)));
	}

	const toggleToDo = (id: number) => {
		window.localStorage.setItem('toDos', JSON.stringify(toDos.map(toDo => {
			if (toDo.id === id) {
				return {
					...toDo,
					completed: !toDo.isCompleted,
				}
			}
			return toDo;
		})));
		setToDos(toDos.map(toDo => {
			if (toDo.id === id) {
				return {
					...toDo,
					completed: !toDo.isCompleted,
				}
			}
			return toDo;
		}));
	}

	const searchToDo = (text: string) => {
		setToDos(toDos.filter(toDo => toDo.text.includes(text)));
	}

	const showCompletedToDos = () => {
		setToDos(toDos.filter(toDo => toDo.isCompleted));
	}

	const showActiveToDos = () => {
		setToDos(toDos.filter(toDo => !toDo.isCompleted));
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


