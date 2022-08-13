import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';
import { nanoid } from 'nanoid';

export const useToDos = () => {
	const LocalStorage = window.localStorage;
	const localToDos = JSON.parse(LocalStorage.getItem('toDos') || '[]') as ToDo[];
	const [toDos, setToDos] = useState<ToDo[]>(localToDos);

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: nanoid(),
			text,
			isCompleted: false,
		};
		const newToDos = [...toDos, newToDo];

		setToDos(newToDos);
		LocalStorage.setItem('toDos', JSON.stringify(newToDos));
	}

	const removeToDo = (id: number | string) => {
		const newToDos = toDos.filter(toDo => toDo.id !== id);
		setToDos(newToDos);
		LocalStorage.setItem('toDos', JSON.stringify(newToDos));
	}

	const toggleToDo = (id: number | string) => {
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
		setToDos(toDos.filter(toDo => toDo.text.toLowerCase().includes(text.toLowerCase())));
	}

	const showCompletedToDos = () => {
		setToDos(toDos.filter(toDo => toDo.isCompleted));
	}

	const showActiveToDos = () => {
		setToDos(toDos.filter(toDo => !toDo.isCompleted));
	}

	const showAllToDos = () => {
		setToDos(JSON.parse(LocalStorage.getItem('toDos') || '[]') as ToDo[]);
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


