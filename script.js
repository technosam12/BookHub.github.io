const input = document.getElementById('input');
const submit = document.getElementById('search-btn');
const collection = document.getElementById('books_collection');
const view = document.getElementById('view-favourite-btn');

const copy = document.querySelector(".carousel-slide").cloneNode(true);
document.querySelector(".carousel").appendChild(copy);

const url = 'https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=50&page=1';
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
        // console.log(data);
        display(data);
        // title_arr = document.querySelectorAll(".title");
        // console.log(title);

    })
    .catch(err => console.error(err));

function display(json) {
    let results = json.results;
    // console.log(json)
    for (let i = 0; i < results.length; i++) {
        // console.log(results[i].authors);
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


submit.addEventListener('click', function () {
    const val = input.value.trim().toLowerCase();
    const books_all = document.querySelectorAll(".book");

    collection.style.display = "grid";

    books_all.forEach(book => {
        book.style.display = "none";
    });

    if (val === "") {
        return;
    }

    for (let i = 0; i < books_all.length; i++) {
        let book = document.getElementById(`book${i}`);
        let title = book.querySelector('.title').textContent.toLowerCase();
        let author = book.querySelector('.author').textContent.toLowerCase();
        let categories = book.querySelector('.categories').textContent.toLowerCase();
        let summary = book.querySelector('.summary').textContent.toLowerCase();

        if (title === "") {
            book.querySelector('.title').textContent = "No information available";
        }

        if (author === "") {
            book.querySelector('.author').textContent = "No information available";
        }

        if (categories === "") {
            book.querySelector('.categories').textContent = "No information available";
        }

        if (summary === "") {
            book.querySelector('.summary').textContent = "No information available";
        }

        if (title.includes(val) || author.includes(val) || categories.includes(val)) {
            book.style.display = "flex";
        }
    }

    runAfterSubmit();
});

function runAfterSubmit() {
    const fav_all = document.querySelectorAll(".add-favourite-btn");

    fav_all.forEach(fav => {
        fav.removeEventListener('click', toggleFavourite);
        fav.addEventListener('click', toggleFavourite);
    });
}

function toggleFavourite() {
    this.classList.toggle('favourite');
    if (this.innerHTML.includes("Add")) {
        this.innerHTML = `<div class="favourite-text">Remove from favourites<i class="fas fa-star" id="star"></i> </div>`;
    } else {
        this.innerHTML = `<div class="favourite-text">Add to favourites<i class="fas fa-star" id="star"></i> </div>`;
    }
}

view.addEventListener('click', function () {
    const books_all = document.querySelectorAll(".book");
    books_all.forEach(book => {
        book.style.display = "none";
    });

    for (let i = 0; i < books_all.length; i++) {
        let book = document.getElementById(`book${i}`);
        let fav = document.getElementById(`fav-btn${i}`)

        if (fav.classList.contains('favourite')) {
            book.style.display = "flex";
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