const Note = require('../models/Note');

// Crear una nueva nota
const createNote = async ({ title, content }) => {
	const newNote = await Note.create({ title, content });
	return newNote;
};

// Obtener todas las notas
const fetchAllNotes = async () => {
	const notes = await Note.findAll();
	return notes;
};

// Obtener una nota por ID
const fetchNoteById = async (id) => {
	const note = await Note.findByPk(id);
	if (!note) throw new Error('Nota no encontrada');
	return note;
};

// Actualizar una nota por ID
const updateNote = async (id, { title, content }) => {
	const note = await Note.findByPk(id);
	if (!note) throw new Error('Nota no encontrada');

	note.title = title ?? note.title;
	note.content = content ?? note.content;
	await note.save();

	return note;
};

// Eliminar una nota por ID
const deleteNote = async (id) => {
	const note = await Note.findByPk(id);
	if (!note) throw new Error('Nota no encontrada');

	await note.destroy();
	return { message: 'Nota eliminada correctamente' };
};

module.exports = {
	createNote,
	fetchAllNotes,
	fetchNoteById,
	updateNote,
	deleteNote,
};
