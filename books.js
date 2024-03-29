// created my own file and pasted the starter code into it so i could upload it to my own github repository

//  ================ books html renderer function ========================

let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books"); //stores our books class in booksWrapper

  // adds our loading stage onto the class whilst getting the book info
  booksWrapper.classList += " books__loading";
  if (!books) { // still unclear on how this one works
    books = await getBooks(); //stores our fake data books into 'books' NOTE: cost cannot change
  }
  booksWrapper.classList.remove("books__loading");


  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (b, a) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (b, a) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating); //ABSOLIUTELY GENIUS
  }

  const booksHTML = books
    .map((book) => {
      // since books is stored in a const variable, it cannot change, so we stored in in another variable (booksHTML) to call upon

      return `<div class="book">
      <figure class="book__img--wrapper">
        <img class="book__img" src= "${book.url}" alt="Where tf is my img"> 
      </figure>
      <div class="book__title"> 
        ${book.title}
      </div>
      <div class="book__ratings">
        ${ratingsHTML(book.rating)}
      </div>
      <div class="book__price">
        ${priceHTML(book.originalPrice, book.salePrice)}
      </div>
    </div>`;
    })
    .join(""); // joins whats printing in the console log together in a string, makes it a lot easier to know whats goin on
  //basically puts it into one string

  booksWrapper.innerHTML = booksHTML; // puts our booksHTML into our books wrapper
}

//
function priceHTML(originalPrice, salePrice) {
  console.log(originalPrice, salePrice);
  if (!salePrice) {
    //this is saying if there is no sale price then to return
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span> $${salePrice.toFixed(2)}`;
}

//  ================ end books html renderer function ========================

function ratingsHTML(rating) {
  //unsure as to why I shouldnt write 'books.rating'
  let ratingHTML = "";
  for (i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  return ratingHTML;
}

//  ================ books filter ========================

function filterBooks(event) {
  //NOTE: event is a key word, not just a name.
  renderBooks(event.target.value); //this was put into a function so we can use the event key word to link our 'value' in the HTML to the js
}

//TIME OUT FOR BOOKS RENDERER == IGNORE
setTimeout(() => {
  renderBooks();
}, 1000); //set time outs push everything to the end of the event loop, meaining this will run after the books are loaded. without it, it wont run (must have timer set, in this case its 1 second)
// ================

//  ================ end books filter ========================

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
