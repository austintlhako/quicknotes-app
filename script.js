// ==========================================
// 1. Element Selection using querySelector
// ==========================================
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

// ==========================================
// 2. LocalStorage & State Initialization
// ==========================================
const STORAGE_KEY = 'quicknotes_data';

// Load notes from localStorage using JSON.parse or initialize empty array
let notes = [];
try {
  const savedNotes = localStorage.getItem(STORAGE_KEY);
  notes = savedNotes ? JSON.parse(savedNotes) : [];
} catch (e) {
  console.error('Failed to load notes from localStorage:', e);
  notes = [];
}

// ==========================================
// 3. Helper Functions
// ==========================================

// Save array to localStorage using JSON.stringify
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Update the note count paragraph with correct grammar for 0, 1, and many notes
function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = 'No notes found';
  } else if (count === 1) {
    noteCount.textContent = '1 note';
  } else {
    noteCount.textContent = `${count} notes`;
  }
}

// ==========================================
// 4. Render Function (Uses createElement & textContent)
// ==========================================
function render() {
  // Clear existing list
  notesList.textContent = '';

  const searchTerm = searchInput.value.trim().toLowerCase();

  // Filter notes based on search input
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  // Render each filtered note card
  filteredNotes.forEach((note) => {
    // Note Container (<li>)
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Note Details Wrapper
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'note-details';

    // Note Text
    const textPara = document.createElement('p');
    textPara.className = 'note-text';
    textPara.textContent = note.text; // Safe from XSS injection

    // Meta Information Container (Category + Date)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    // Category Badge
    const categorySpan = document.createElement('span');
    categorySpan.className = 'note-category-badge';
    categorySpan.textContent = note.category;

    // Date/Time Stamp
    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);

    detailsDiv.appendChild(textPara);
    detailsDiv.appendChild(metaDiv);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete note: ${note.text}`);

    // Delete handler
    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    // Assemble Card
    li.appendChild(detailsDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });

  // Update total/filtered count
  updateNoteCount(filteredNotes.length);
}

// ==========================================
// 5. Add Note Handler & Validation
// ==========================================
function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation: Empty check
  if (text === '') {
    errorMessage.textContent = 'Please enter a note before submitting.';
    return;
  }

  // Validation: Max length check (200 characters)
  if (text.length > 200) {
    errorMessage.textContent = 'Note must be 200 characters or less.';
    return;
  }

  // Clear validation error if valid
  errorMessage.textContent = '';

  // Create new Note Object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  // Update State & Persistence
  notes.unshift(newNote);
  saveNotes();

  // Reset form field
  noteInput.value = '';
  noteInput.focus();

  // Re-render UI
  render();
}

// ==========================================
// 6. Delete Note Handler
// ==========================================
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ==========================================
// 7. Event Listeners
// ==========================================
noteForm.addEventListener('submit', addNote);

// Real-time search filter event listener
searchInput.addEventListener('input', render);

// Clear error message when user starts typing
noteInput.addEventListener('input', () => {
  if (errorMessage.textContent !== '') {
    errorMessage.textContent = '';
  }
});

// Initial Render on Page Load
render();