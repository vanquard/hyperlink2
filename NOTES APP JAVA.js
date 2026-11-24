const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag =  popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");
// Array of month names 
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Retrieve Notes from localstorage or initialize an empty array
const notes = JSON.parse(localStorage.getItem("notes") ||  "[]");
// Flags and Id for note updates
let isUpdate = false, updateId;
// open the popup box to add a new note
addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});
// close the popup box and reset fields
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
// Display existing notes from localstorage
function showNotes () {
    if (!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceALL("\n", '<br/>');
        let litag = `<li class="note">
                         <div class="details">
                              <p>${note.title}</p>
                              <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                             <span>${note.date}</span>
                             <div class="settings">
                                <i onclick="showdownMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick='updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                             </div.
                        </div>
                     </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
// show menu options for each note
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
// Delete a Specific note
function deleteNote(noteId) {
    let confirmDel = confirm("are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
// Update a specific note
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceALL('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "update Note";
                                            }
// Add or update a note on button click
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim();
    if (title || description ) {
        let currentDate = new Date(),
          month = months[currentDate.getMonth()],
          day = currentDate.getDate(),
          year = currentDate.getFullYear();
        let noteInfo = { title, description, date: `${month} ${day}, ${year}
    `}
      if (!isUpdate) {
        notes.push(noteInfo);
      } else {
        isUpdate = false;
        notes[updateId] = noteInfo;
      }
      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes();
      closeIcon.click();
    }
}) ; 