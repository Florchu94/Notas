const {
	createNote,
	fetchAllNotes,
	fetchNoteById,
	updateNote,
	deleteNote,
} = require('../services/noteService');

// Crear una nueva nota
const createNoteHandler = async (req, res) => {
	try {
		const { title, content } = req.body;

		if (!title || !content) {
			return res.status(400).json({ error: 'Faltan campos requeridos' });
		}

		const newNote = await createNote({ title, content });
		res.status(201).json(newNote);
	} catch (error) {
		console.error('❌ Error en createNoteHandler:', error);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// Obtener todas las notas
const getAllNotes = async (req, res) => {
	try {
		const notes = await fetchAllNotes();
		res.status(200).json(notes);
	} catch (error) {
		console.error('❌ Error al obtener notas:', error);
		res.status(500).json({ error: 'No se pudieron obtener las notas' });
	}
};

// Obtener una nota por ID
const getNoteById = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await fetchNoteById(id);
		res.status(200).json(note);
	} catch (error) {
		console.error('❌ Error al obtener la nota:', error);
		res.status(404).json({ error: 'Nota no encontrada' });
	}
};

// Actualizar una nota por ID
const updateNoteHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;

		const updatedNote = await updateNote(id, { title, content });
		res.status(200).json(updatedNote);
	} catch (error) {
		console.error('❌ Error al actualizar la nota:', error);
		res.status(404).json({ error: 'Nota no encontrada o error al actualizar' });
	}
};

// Eliminar una nota por ID
const deleteNoteHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deleteNote(id);
		res.status(200).json(result);
	} catch (error) {
		console.error('❌ Error al eliminar la nota:', error);
		res.status(404).json({ error: 'Nota no encontrada o error al eliminar' });
	}
};

module.exports = {
	createNoteHandler,
	getAllNotes,
	getNoteById,
	updateNoteHandler,
	deleteNoteHandler,
};
