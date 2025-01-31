document.addEventListener("DOMContentLoaded", function () {
    const addNoteBtn = document.getElementById("addNoteBtn");
    const notesContainer = document.getElementById("notesContainer");
    const toggleThemeBtn = document.getElementById("toggleTheme");
    const toast = document.getElementById("toast");

    function loadNotes() {
        const savedNotes = JSON.parse(sessionStorage.getItem("notes")) || [];
        savedNotes.forEach(note => addNote(note.title, note.content));
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll(".note").forEach(note => {
            const title = note.querySelector("input").value;
            const content = note.querySelector("textarea").value;
            notes.push({ title, content });
        });
        sessionStorage.setItem("notes", JSON.stringify(notes));

        toast.classList.add("toast-show");
        setTimeout(() => toast.classList.remove("toast-show"), 2000);
    }

    function addNote(title = "", content = "") {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Title";
        titleInput.value = title;
        titleInput.addEventListener("input", saveNotes);

        const textarea = document.createElement("textarea");
        textarea.placeholder = "Write your note...";
        textarea.value = content;
        textarea.addEventListener("input", function () {
            saveNotes();
            charCount.textContent = textarea.value.length + " chars";
        });

        const noteFooter = document.createElement("div");
        noteFooter.classList.add("note-footer");

        const charCount = document.createElement("span");
        charCount.textContent = content.length + " chars";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", function () {
            noteDiv.remove();
            saveNotes();
        });

        noteFooter.appendChild(charCount);
        noteFooter.appendChild(deleteBtn);
        noteDiv.appendChild(titleInput);
        noteDiv.appendChild(textarea);
        noteDiv.appendChild(noteFooter);

        notesContainer.appendChild(noteDiv);
        saveNotes();
    }

    toggleThemeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    addNoteBtn.addEventListener("click", function () {
        addNote();
    });

    loadNotes();
});
