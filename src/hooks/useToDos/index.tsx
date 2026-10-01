import { useState } from 'react';
import { ToDo } from '@src/customTypes/ToDo';
import { nanoid } from 'nanoid';

type ToDoStatusFilter = 'all' | 'pending' | 'done';

export const useToDos = () => {
	const LocalStorage = window.localStorage;
	const [localToDos, setLocalToDos] = useState<ToDo[]>(() =>
		JSON.parse(LocalStorage.getItem('toDos') || '[]') as ToDo[],
	);
	const [statusFilter, setStatusFilter] = useState<ToDoStatusFilter>('all');
	const [searchText, setSearchText] = useState('');

	const toDos = localToDos.filter(toDo => {
		const matchesStatus = statusFilter === 'all'
			|| (statusFilter === 'pending' && !toDo.isCompleted)
			|| (statusFilter === 'done' && toDo.isCompleted);
		const matchesSearch = toDo.text.toLowerCase().includes(searchText.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const saveToDos = (nextToDos: ToDo[]) => {
		setLocalToDos(nextToDos);
		LocalStorage.setItem('toDos', JSON.stringify(nextToDos));
	};

	const addToDo = (text: string) => {
		const newToDo: ToDo = {
			id: nanoid(),
			text,
			isCompleted: false,
		};
		saveToDos([...localToDos, newToDo]);
	}

	const removeToDo = (id: number | string) => {
		saveToDos(localToDos.filter(toDo => toDo.id !== id));
	}

	const toggleToDo = (id: number | string) => {
		saveToDos(localToDos.map(toDo => toDo.id === id
			? { ...toDo, isCompleted: !toDo.isCompleted }
			: toDo,
		));
	}

	const searchToDo = (text: string) => {
		setSearchText(text);
	}

	const clearSearchText = () => {
		setSearchText('');
	}

	const showCompletedToDos = () => {
		setStatusFilter('done');
	}

	const showActiveToDos = () => {
		setStatusFilter('pending');
	}

	const showAllToDos = () => {
		setStatusFilter('all');
	}

	return {
		toDos,
		localToDos,
		searchText,
		addToDo,
		removeToDo,
		toggleToDo,
		searchToDo,
		clearSearchText,
		showCompletedToDos,
		showActiveToDos,
		showAllToDos,
	}
}
