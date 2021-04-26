// Library array - placeholder for future database/serialization
let myLibrary = [];

// Book constructor
function Book(title, author, pageCount, hasBeenRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasBeenRead = hasBeenRead;

  this.info = () => {
    return `${title} by ${author}\n${pageCount} pages\nStatus: ${
      hasBeenRead ? "read" : "unread."
    }`;
  };
}

// Music Book constructor
function MusicBook(editor, instrument, title, author, pageCount, hasBeenRead) {
  this.editor = editor;
  this.instrument = instrument;
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasBeenRead = hasBeenRead;
}

// Add a new book to library array
function addBookToLibrary(book) {
  myLibrary.unshift(book);
  displayBooks();
}

// Remove book from the library array based on provided index
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}
// Sample books
let oddThomas = new Book("Odd Thomas", "Dean Koontz", 299, true);
let fearAndLoathing = new Book(
  "Fear and Loathing in Las Vegas",
  "Hunter S. Thompson",
  233,
  true
);
let ofMiceAndMen = new Book("Of Mice and Men", "John Steinback", 98, true);
let inferno = new Book("Inferno", "Dan Brown", 574, false);
let bachLuteSuites = new MusicBook(
  "Frank Koonce",
  "Guitar",
  "Bach Lute Suites for Solo Guitar",
  "J.S. Bach",
  197,
  true
);
// Add sample books to array
addBookToLibrary(oddThomas);
addBookToLibrary(fearAndLoathing);
addBookToLibrary(ofMiceAndMen);
addBookToLibrary(inferno);
addBookToLibrary(bachLuteSuites);

// Render books in DOM and assign bookId to allow for removal
function displayBooks() {
  const bookContainer = document.querySelector(".container");
  let bookId = 0;

  bookContainer.innerHTML = "";

  // Render each book card
  myLibrary.forEach((book) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", bookId);

    card.innerHTML = `<h3>${book.title}</h3>
                      <p>By ${book.author}</p>
                      <p>Page Count: ${book.pageCount}
                      <p>Status: ${book.hasBeenRead ? "Read" : "Unread"}</p>`;

    if (book.editor && book.instrument) {
      card.innerHTML += `<p>Instrument: ${book.instrument}
                         <p>Editor: ${book.editor}</p>`;
    }

    card.innerHTML += '<button class="btn-delete">Delete</button>';
    card.innerHTML += `<button class="btn-read">Mark ${
      book.hasBeenRead ? "Unread" : "Read"
    }</button>`;
    // Appended card to book container's end and increment book id counter
    bookContainer.append(card);
    bookId++;
  });

  addBookEventListeners();
}

displayBooks();

let addButton = document.querySelector(".btn-add");

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.querySelector("input[name=title]").value;
  let author = document.querySelector("input[name=author]").value;
  let pageCount = document.querySelector("input[name=pageCount]").value;
  let read = document.querySelector("input[name=read]").value;

  console.log(
    "Process adding of book entitled " +
      title +
      " by " +
      author +
      " that is " +
      pageCount +
      " pages long and " +
      (read ? "has" : "has not") +
      " been read."
  );

  let newBook = new Book(title, author, pageCount, read);
  addBookToLibrary(newBook);
});

function addBookEventListeners() {
  // Add delete button events to all delete buttons
  let deleteButtons = [...document.querySelectorAll(".btn-delete")];
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      alert("About to delete book with the id of " + id);

      removeBookFromLibrary(id);
    });
  });

  // Add Read/Unread button events to all book cards
  let readButtons = [...document.querySelectorAll(".btn-read")];
  readButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      myLibrary[id].hasBeenRead = !myLibrary[id].hasBeenRead;
      displayBooks();
    });
  });
}
