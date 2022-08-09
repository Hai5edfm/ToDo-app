import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';

export const useToDos = () => {
	const localToDos = JSON.parse(window.localStorage.getItem('toDos') || '[]') as ToDo[];
	const [toDos, setToDos] = useState<ToDo[]>(localToDos);

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: toDos.length + 1,
			text,
			completed: false,
		};

		setToDos([...toDos, newToDo]);
		window.localStorage.setItem('toDos', JSON.stringify([...toDos, newToDo]));
	}

	const removeToDo = (id: number) => {
		setToDos(toDos.filter(toDo => toDo.id !== id));
		window.localStorage.setItem('toDos', JSON.stringify(toDos.filter(toDo => toDo.id !== id)));
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
		window.localStorage.setItem('toDos', JSON.stringify(toDos.map(toDo => {
			if (toDo.id === id) {
				return {
					...toDo,
					completed: !toDo.completed,
				}
			}
			return toDo;
		})));
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


