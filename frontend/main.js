const API_URL = 'http://localhost:3001/notes';
const form = document.getElementById('noteForm');
const container = document.getElementById('notesContainer');

// Crear nota
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const title = document.getElementById('title').value;
	const content = document.getElementById('content').value;

	const response = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, content }),
	});

	if (response.ok) {
		form.reset();
		fetchNotes();
	}
});

// Obtener notas
const fetchNotes = async () => {
	container.innerHTML = '';
	const res = await fetch(API_URL);
	const notes = await res.json();

	notes.forEach((note) => {
		const div = document.createElement('div');
		div.className = 'note';
		div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-actions">
        <button onclick="editNote('${note.id}', '${note.title}', \`${note.content}\`)">Editar</button>
        <button onclick="deleteNote('${note.id}')">Eliminar</button>
      </div>
    `;
		container.appendChild(div);
	});
};

fetchNotes();

// Eliminar notas
const deleteNote = async (id) => {
	const confirmDelete = confirm(
		'¿Estás segura de que querés eliminar esta nota?'
	);
	if (!confirmDelete) return;

	const res = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE',
	});

	if (res.ok) fetchNotes();
};

const editNote = async (id, currentTitle, currentContent) => {
	const title = prompt('Nuevo título:', currentTitle);
	const content = prompt('Nuevo contenido:', currentContent);
	if (!title || !content) return;

	const res = await fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, content }),
	});

	if (res.ok) fetchNotes();
};
