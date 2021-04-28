// Library array - placeholder for future database/serialization
let myLibrary;

if (localStorage.getItem("books")) {
  myLibrary = JSON.parse(localStorage.getItem("books"));
} else {
  myLibrary = [];
}

let coverImages = [];
// Book constructor
function Book(title, author, pageCount, hasBeenRead, isbn) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasBeenRead = hasBeenRead;
  this.isbn = isbn;

  this.info = () => {
    return `${title} by ${author}\n${pageCount} pages\nStatus: ${
      hasBeenRead ? "read" : "unread."
    }`;
  };
}

// Music Book constructor
function MusicBook(
  editor,
  instrument,
  title,
  author,
  pageCount,
  hasBeenRead,
  isbn
) {
  this.editor = editor;
  this.instrument = instrument;
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasBeenRead = hasBeenRead;
  this.isbn = isbn;
}

// Add a new book to library array
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

// Remove book from the library array based on provided index
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

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
                      <img src="" />
                      <p>By ${book.author}</p>
                      <p>Page Count: ${book.pageCount}</p>
                      <p>ISBN #: ${book.isbn}</p>
                      <p>Status: ${book.hasBeenRead ? "Read" : "Unread"}</p>`;

    if (book.editor && book.instrument) {
      card.innerHTML += `<p>Instrument: ${book.instrument}
                         <p>Editor: ${book.editor}</p>`;
    }

    card.innerHTML += '<button class="btn btn-delete">Delete</button>';
    card.innerHTML += `<button class=" btn btn-read">Mark ${
      book.hasBeenRead ? "Unread" : "Read"
    }</button>`;

    // Appended card to book container's end and increment book id counter
    bookContainer.append(card);
    bookId++;
  });

  addBookEventListeners();
}

displayBooks();

getBookCovers();
let addButton = document.querySelector(".btn-add");

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.querySelector("input[name=title]").value;
  let author = document.querySelector("input[name=author]").value;
  let pageCount = document.querySelector("input[name=pageCount]").value;
  let isbn = document.querySelector("input[name=isbn]").value;
  // Assume incoming books are unread
  let read = document.querySelector("input[value=yes]").checked ? true : false;

  if (validateFormInput(title, author, pageCount, read)) {
    let newBook = new Book(title, author, pageCount, read, isbn);
    addBookToLibrary(newBook);
    clearFormFields();
    getBookCovers();
  }
});

function addBookEventListeners() {
  // Add delete button events to all delete buttons
  let deleteButtons = [...document.querySelectorAll(".btn-delete")];
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");

      removeBookFromLibrary(id);

      getBookCovers();
    });
  });

  // Add Read/Unread button events to all book cards
  let readButtons = [...document.querySelectorAll(".btn-read")];
  readButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      myLibrary[id].hasBeenRead = !myLibrary[id].hasBeenRead;
      displayBooks();

      getBookCovers();
    });
  });
}

function validateFormInput(title, author, pageCount, read) {
  if (title == "") {
    document.querySelector(".validation-message").textContent =
      "Please include the book title.";

    setTimeout(() => {
      document.querySelector(".validation-message").textContent = "";
    }, 3500);

    return false;
  }

  if (author == "") {
    document.querySelector(".validation-message").textContent =
      "Please include the author's name.";

    setTimeout(() => {
      document.querySelector(".validation-message").textContent = "";
    }, 3500);

    return false;
  }

  if (pageCount == "") {
    document.querySelector(".validation-message").textContent =
      "Please include the page count.";

    setTimeout(() => {
      document.querySelector(".validation-message").textContent = "";
    }, 3500);
    return false;
  }

  return true;
}

function clearFormFields() {
  document.querySelector("input[name=title]").value = "";
  document.querySelector("input[name=author]").value = "";
  document.querySelector("input[name=pageCount]").value = "";
  document.querySelector("input[name=isbn]").value = "";
}

async function getBookCover(index) {
  // SAMPLE: http://covers.openlibrary.org/b/isbn/9780679785897-M.jpg

  let isbn = myLibrary[index].isbn;

  let coverURL = await fetch(
    `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  );
  coverImages.push(coverURL.url);

  let image = document.createElement("img");
}

async function getBookCovers() {
  coverImages = [];
  let cards = [...document.querySelectorAll(".card")];
  cards.forEach;

  for (let index = 0; index < myLibrary.length; index++) {
    getBookCover(index);
  }

  setTimeout(renderImages, 3000);
}

function renderImages() {
  for (let i = 0; i < myLibrary.length; i++) {
    let cardImage = document.querySelector(`[data-id="${i}"] > img`);
    cardImage.src = coverImages[i];
  }
}
