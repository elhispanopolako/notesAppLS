const addBtn = document.getElementById('add')
const notesLS = JSON.parse(localStorage.getItem('notes'))
if (notesLS) {
    notesLS.forEach(note => addNewNote(note))
}
addBtn.addEventListener('click', () => addNewNote())
function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML =
        `  <div class="tools">
    <button class="edit"><em class="fas fa-edit"></em></button>
    <button class="delete"><em class="fas fa-trash-alt"></em></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textarea = note.querySelector('textarea')
    textarea.value = text
    main.innerHTML = marked.parse(text)
    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textarea.classList.toggle('hidden')
    })
    textarea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked.parse(value)
        updateLS()
    })
    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []
    notesText.forEach(note => notes.push(note.value))
    localStorage.setItem('notes', JSON.stringify(notes))
}