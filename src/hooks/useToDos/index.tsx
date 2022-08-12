import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';

export const useToDos = () => {
	const LocalStorage = window.localStorage;
	const localToDos = JSON.parse(LocalStorage.getItem('toDos') || '[]') as ToDo[];
	const [toDos, setToDos] = useState<ToDo[]>(localToDos);

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: toDos.length + 1,
			text,
			isCompleted: false,
		};
		const newToDos = [...toDos, newToDo];

		setToDos(newToDos);
		LocalStorage.setItem('toDos', JSON.stringify(newToDos));
	}

	const removeToDo = (id: number) => {
		const newToDos = toDos.filter(toDo => toDo.id !== id);
		setToDos(newToDos);
		LocalStorage.setItem('toDos', JSON.stringify(newToDos));
	}

	const toggleToDo = (id: number) => {
		LocalStorage.setItem('toDos', JSON.stringify(toDos.map(toDo => {
			if (toDo.id === id) {
				return {
					...toDo,
					isCompleted: !toDo.isCompleted,
				}
			}
			return toDo;
		})));
		setToDos(JSON.parse(LocalStorage.getItem('toDos') || '[]') as ToDo[]);
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


