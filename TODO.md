DONE - form validation messages

- database persistence
- fonts and polished styles
- update media queries and ensure totally responsive
- swap timeout for async function when grabbing covers from API

// Sample books
let oddThomas = new Book(
"Odd Thomas",
"Dean Koontz",
299,
true,
"9780553802498"
);

let fearAndLoathing = new Book(
"Fear and Loathing in Las Vegas",
"Hunter S. Thompson",
233,
true,
"9780394464350"
);
let ofMiceAndMen = new Book(
"Of Mice and Men",
"John Steinback",
98,
true,
"9780140177398"
);
let inferno = new Book("Inferno", "Dan Brown", 574, false, "9781400079155");

// Add sample books to array
// addBookToLibrary(oddThomas);
// addBookToLibrary(ofMiceAndMen);
addBookToLibrary(inferno);
