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

function addBookToLibrary(book) {
  myLibrary.unshift(book);
}

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

// Add sample books to array
addBookToLibrary(oddThomas);
addBookToLibrary(fearAndLoathing);
addBookToLibrary(ofMiceAndMen);
addBookToLibrary(inferno);

const bookContainer = document.querySelector(".container");
let bookId = 0;

function displayBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", bookId);

    card.innerHTML = `<h3>${book.title}</h3>
                    <p>By ${book.author}</p>
                    <p>Page Count: ${book.pageCount}
                    <p>Status: ${book.hasBeenRead ? "Read" : "Unread"}</p>`;
    bookContainer.append(card);
    bookId++;
  });
}

displayBooks();
