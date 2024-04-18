const author = document.getElementById('author');
const title = document.getElementById('title');
const submit = document.getElementById('search-btn');
const collection = document.getElementById('books_collection');
const view = document.getElementById('view-favourite-btn');
const home_search = document.querySelector('.home-search');

home_search.addEventListener('click', function () {
    submit.scrollIntoView();
})

const copy = document.querySelector(".carousel-slide").cloneNode(true);
document.querySelector(".carousel").appendChild(copy);

submit.addEventListener('click', function () {
    let author_val = author.value.trim().toLowerCase();
    let title_val = title.value.trim().toLowerCase();

    if (author_val === '' && title_val !== '') {
        let url = `https://book-finder1.p.rapidapi.com/api/search?title=${title_val}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'da94348b87msh99e2c4edc5c56b7p1c190bjsn38d1a3f4fe83',
                'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();

            })

            .then(data => {
                display(data);
            })
            .catch(err => console.error(err));

        runAfterSubmit();
    }

    else if (author_val !== '' && title_val === '') {
        let url = `https://book-finder1.p.rapidapi.com/api/search?author=${author_val}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'da94348b87msh99e2c4edc5c56b7p1c190bjsn38d1a3f4fe83',
                'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();

            })

            .then(data => {
                display(data);
            })
            .catch(err => console.error(err));

        runAfterSubmit();
    }

    else if (author_val !== '' && title_val !== '') {
        let url = `https://book-finder1.p.rapidapi.com/api/search?title=${title_val}&author=${author_val}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'da94348b87msh99e2c4edc5c56b7p1c190bjsn38d1a3f4fe83',
                'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();

            })

            .then(data => {
                display(data);
            })
            .catch(err => console.error(err));

        runAfterSubmit();
    }
})

function display(json) {
    collection.innerHTML = "";
    let results = json.results;
    for (let i = 0; i < results.length; i++) {
        collection.innerHTML += card(results[i], i);
    }
}

function card(book, num) {
    return `
    <div class="book" id="book${num}" style="display: flex;">
    
    <div class="des">
        <div class="heading">Title: </div>
        <div class="title">${book.title}</div>
    </div>

    <div class="des">
        <div class="heading">Author: </div>
        <div class="author">${book.authors}</div>
    </div>

    <div class="des">
        <div class="heading">Categories: </div>
        <div class="categories">${book.categories}</div>
    </div>

    <div class="des">
        <div class="heading">Summary: </div>
        <div class="summary">${book.summary}</div>
    </div>

    <div class="add-favourite-btn" id="fav-btn${num}">
        <div class="favourite-text">Add to favourites<i class="fas fa-star" id="star"></i> </div>
    </div>

</div>`
}

function runAfterSubmit() {
    collection.addEventListener('click', favourite);
}

function favourite(event) {
    if (event.target.parentElement.classList.contains('add-favourite-btn')) {

        alert("Added to Favourites")

        const clickedButton = event.target.parentElement;
        // clickedButton.classList.toggle('favourite');

        const bookcard = clickedButton.parentElement;

        const bookdata = {
            title: bookcard.querySelector(".title").textContent,
            authors: bookcard.querySelector(".author").textContent,
            categories: bookcard.querySelector(".categories").textContent,
            summary: bookcard.querySelector(".summary").textContent,
        }

        const bookJSON = JSON.stringify(bookdata);
        localStorage.setItem(bookdata.title, bookJSON);

        // if (clickedButton.innerHTML.includes("Add")) {
        //     clickedButton.innerHTML = `<div class="favourite-text">Remove from favourites<i class="fas fa-star" id="star"></i> </div>`;
        // } else {
        //     clickedButton.innerHTML = `<div class="favourite-text">Add to favourites<i class="fas fa-star" id="star"></i> </div>`;
        // }
    }
}

function fav_card(book, num) {
    return `
    <div class="book" id="book${num}" style="display: flex;">
    
    <div class="des">
        <div class="heading">Title: </div>
        <div class="title">${book.title}</div>
    </div>

    <div class="des">
        <div class="heading">Author: </div>
        <div class="author">${book.authors}</div>
    </div>

    <div class="des">
        <div class="heading">Categories: </div>
        <div class="categories">${book.categories}</div>
    </div>

    <div class="des">
        <div class="heading">Summary: </div>
        <div class="summary">${book.summary}</div>
    </div>

</div>`
}

view.addEventListener('click', function () {
  const books_all = document.querySelectorAll(".book");
  books_all.forEach(book => {
    book.style.display = "none";
  });

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const bookJSON = localStorage.getItem(key);

    if (bookJSON) {
      const bookdata = JSON.parse(bookJSON);
      const bookHTML = fav_card(bookdata,i);
      collection.innerHTML += bookHTML;
    }
  }
})

const hamburger_button = document.getElementById('menu-btn');
const hometext = document.getElementById('home-text');
const menu = document.getElementById('mobile-menu');

hamburger_button.addEventListener('click', function () {
    hamburger_button.classList.toggle('open');
    document.body.classList.toggle('stop-scrolling');
    hometext.classList.toggle('hamburger-home-text');
    menu.classList.toggle('show-menu');
})

const menu_links = document.querySelectorAll('#mobile-menu li a');

menu_links.forEach(link => {
    link.addEventListener('click', function () {
        hamburger_button.classList.toggle('open');
        document.body.classList.toggle('stop-scrolling');
        hometext.classList.toggle('hamburger-home-text');
        menu.classList.toggle('show-menu');

    })
})