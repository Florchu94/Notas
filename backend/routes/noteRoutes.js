const express = require('express');
const router = express.Router();

const {
	createNoteHandler,
	getAllNotes,
	getNoteById,
	updateNoteHandler,
	deleteNoteHandler,
} = require('../controllers/noteController');

// GET /notes → obtener todas las notas
router.get('/', getAllNotes);

// GET /notes/:id → obtener una nota por ID
router.get('/:id', getNoteById);

// POST /notes → crear una nota nueva
router.post('/', createNoteHandler);

// PUT /notes/:id → actualizar una nota por ID
router.put('/:id', updateNoteHandler);

// DELETE /notes/:id → eliminar una nota por ID
router.delete('/:id', deleteNoteHandler);

module.exports = router;
