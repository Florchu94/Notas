const API_URL = 'http://localhost:3001/notes';
const form = document.getElementById('noteForm');
const container = document.getElementById('notesContainer');

// Crear nota
form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor completá todos los campos antes de guardar la nota.',
    });
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) throw new Error('Error al crear la nota');
    form.reset();
    fetchNotes();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al crear la nota.',
    });
    console.error(error);
  }
});

// Obtener notas
const fetchNotes = async () => {
  container.innerHTML = '';

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener las notas');

    const notes = await res.json();

    notes.forEach(note => {
      const div = document.createElement('div');
      div.className = 'note';

      const title = document.createElement('h3');
      title.textContent = note.title;

      const content = document.createElement('p');
      content.textContent = note.content;

      const actions = document.createElement('div');
      actions.className = 'note-actions';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.onclick = () => editNote(note.id, note.title, note.content);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.onclick = () => deleteNote(note.id);

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      div.appendChild(title);
      div.appendChild(content);
      div.appendChild(actions);

      container.appendChild(div);
    });
  } catch (error) {
    alert('No se pudieron cargar las notas.');
    console.error(error);
  }
};

fetchNotes();

// Eliminar nota
const deleteNote = async id => {
  const result = await Swal.fire({
    title: '¿Eliminar esta nota?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Error al eliminar la nota');

    Swal.fire('Eliminada', 'La nota fue eliminada.', 'success');
    fetchNotes();
  } catch (error) {
    Swal.fire('Error', 'No se pudo eliminar la nota.', 'error');
    console.error(error);
  }
};

// Editar nota
const editNote = async (id, currentTitle, currentContent) => {
  const { value: formValues } = await Swal.fire({
    title: 'Editar nota',
    html: `
      <input id="swal-input1" class="swal2-input" value="${currentTitle}" placeholder="Título">
      <textarea id="swal-input2" class="swal2-textarea" placeholder="Contenido">${currentContent}</textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const title = document.getElementById('swal-input1').value.trim();
      const content = document.getElementById('swal-input2').value.trim();
      if (!title || !content) {
        Swal.showValidationMessage('El título y el contenido no pueden estar vacíos.');
        return;
      }
      return { title, content };
    },
  });

  if (!formValues) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });

    if (!res.ok) throw new Error('Error al editar la nota');
    Swal.fire('Actualizada', 'La nota fue modificada con éxito.', 'success');
    fetchNotes();
  } catch (error) {
    Swal.fire('Error', 'No se pudo editar la nota.', 'error');
    console.error(error);
  }
};
