// Elements
const addNoteBtn = document.getElementById("add-note");
const notesContainer = document.getElementById("notes-container");
const toggleThemeBtn = document.getElementById("toggle-theme");

// Load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(createNote);
}

// Save notes to localStorage
function saveNotes() {
  const notes = Array.from(notesContainer.children).map(note => note.querySelector("textarea").value);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Create a new note
function createNote(text = "") {
  const note = document.createElement("div");
  note.className = "note";

  const currentDate = new Date();
  const dateElement = document.createElement("p");
  dateElement.textContent = `Created on: ${currentDate.toLocaleDateString()}`;

  note.innerHTML = `
    <textarea>${text}</textarea>
    <button class="delete-note">Delete</button>
  `;
  
  // Add date to the note
  note.appendChild(dateElement);

  // Add delete functionality
  note.querySelector(".delete-note").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Add input event listener to save notes
  note.querySelector("textarea").addEventListener("input", saveNotes);

  // Double-click to zoom the note
  note.addEventListener("dblclick", () => {
    // Toggle zoom effect by adding/removing a class
    note.classList.toggle("zoomed");
  });

  notesContainer.appendChild(note);
}

// Add new note on button click
addNoteBtn.addEventListener("click", () => createNote());

// Toggle dark/light theme
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Initialize app
loadNotes();
