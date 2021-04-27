// Library array - placeholder for future database/serialization
let myLibrary = [];
let coverImages = [];
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
                      <img src="" />
                      <p>By ${book.author}</p>
                      <p>Page Count: ${book.pageCount}
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
  let read = document.querySelector("input[name=read]").value;

  if (validateFormInput(title, author, pageCount, read)) {
    let newBook = new Book(title, author, pageCount, read);
    addBookToLibrary(newBook);
    clearFormFields();
  }
});

function addBookEventListeners() {
  // Add delete button events to all delete buttons
  let deleteButtons = [...document.querySelectorAll(".btn-delete")];
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      alert("About to delete book with the id of " + id);

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
  if (title == "" || author == "" || pageCount == "") {
    alert("invalid");
    return false;
  }

  return true;
}

function clearFormFields() {
  document.querySelector("input[name=title]").value = "";
  document.querySelector("input[name=author]").value = "";
  document.querySelector("input[name=pageCount]").value = "";
}

async function getBookCover() {
  // SAMPLE: http://covers.openlibrary.org/b/isbn/9780679785897-M.jpg

  let isbn = "1400079152";

  let coverURL = await fetch(
    `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  );
  coverImages.push(coverURL.url);

  let image = document.createElement("img");
}

async function getBookCovers() {
  let cards = [...document.querySelectorAll(".card")];
  cards.forEach((card) => getBookCover());

  setTimeout(renderImages, 300);
}

function renderImages() {
  for (let i = 0; i < myLibrary.length; i++) {
    let cardImage = document.querySelector(`[data-id="${i}"] > img`);
    cardImage.src = coverImages[i];
  }
}
