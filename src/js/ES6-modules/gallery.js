let onloading = () => {
    const apiKey = 'AIzaSyANsAgrumkgN6m7FNtut1pWDmt0Rdr7oC4';
    let activeTheme = document.querySelector('.aside__title-active').textContent
    let currentStep = 0;
    const getCountBooks = 6;

    const bookRequest = () => {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q="${activeTheme}"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
            .then(response => {
                return response.json();
            })
            .then((json) => {
                return json['items'];
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const getAndShow = async () => {
        let books = await bookRequest();
        currentStep += getCountBooks;
        books.forEach((book) => {
            let img = book.volumeInfo.imageLinks?.thumbnail ?? 'images/logo.svg';
            let authors = book.volumeInfo.authors?.join(', ') ?? 'Unknown Author';
            let title = book.volumeInfo.title;
            let description = book.volumeInfo?.description ?? 'No description';
            let rev = ` reviews`;
            let ratingsCount = book.volumeInfo?.ratingsCount ?? '';
            if (ratingsCount) {
                ratingsCount = book.volumeInfo.ratingsCount + rev;
            }

            let saleability = book.saleInfo.saleability;
            let cost = 'Without price';
            let costType = '';
            if (saleability === 'FOR_SALE') {
                cost = book.saleInfo.retailPrice?.amount;
                costType = book.saleInfo.retailPrice?.currencyCode;
            }


            let newBook = `<div class="gallery__book" id="${book.id}">
                <img src="${img}" alt="${book.title}" class="gallery__book-img">
                <div class="gallery__book-info">
                    <div class="gallery__book-info__first">
                        <h3 class="gallery__book__first-author">${authors}</h3>
                        <h2 class="gallery__book__first-title">${title}</h2>
                        <div class="gallery__book__first-stars">
                            <div class="gallery__book__first-stars-rating">
                                <div class="count">${ratingsCount}<span></span></div>
                                <div class="stars">
                                    <img src="images/gray-star.svg" class="gray-star">
                                    <img src="images/gray-star.svg" class="gray-star">
                                    <img src="images/gray-star.svg" class="gray-star">
                                    <img src="images/gray-star.svg" class="gray-star">
                                    <img src="images/gray-star.svg" class="gray-star">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gallery__book__second">
                        <p class="gallery__book__second-description">${description}</p>
                        <span class="gallery__book__second-price">${cost}${costType}</span>
                        <button class="gallery__book__btn" id="${book.id}"><a href="#" onclick="return false;" class="">BUY NOW</a></button>
                    </div>
                </div>
            </div>`;
            document.querySelector('.gallery__books').innerHTML += newBook;


          
            const currentBook = document.getElementById(book.id);
            let star = currentBook.querySelectorAll('.grey-star');


            let rating = Math.floor(book.volumeInfo.averageRating);
            for (let i = 0; i < rating; i++) {
                star[i].src = 'images/gold-star.svg';
            }
        });

        const btns = Array.from(document.querySelectorAll(".gallery__book__btn"));
        const container = document.querySelector(".bag");

        btns.forEach(btn => {
            if (Object.prototype.hasOwnProperty.call(localStorage, btn.id)) {
                btn.classList.add("added");
                btn.innerHTML = "IN THE CART";
            }

            let bagItems = `<div class="bag-number">${Object.keys(localStorage).length}</div>`;
            if (Object.keys(localStorage).length > 0) {
                container.innerHTML = bagItems;
            }

            btn.addEventListener("click", () => {
                const idName = btns.id;
                if (!btn.classList.contains("added")) {
                    btn.innerHTML = "IN THE CART";
                    btn.classList.add("added");
                    localStorage.setItem(idName, btn.id);
                } else if (btn.classList.contains("added")) {
                    btn.innerHTML = "BUY NOW";
                    btn.classList.remove("added");
                    localStorage.removeItem(idName, btn.id);
                }
                bagItems = `<div class="bag-number">${Object.keys(localStorage).length}</div>`;
                container.innerHTML = bagItems;
                if (Object.keys(localStorage).length == 0) {
                    container.innerHTML = " ";
                }
            });
        });
    };

    getAndShow();


    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('aside__title')) {
            event.preventDefault();
            document.querySelector('.aside__title.aside__title-active')?.classList?.remove('aside__title-active');
            event.target.classList.add('aside__title-active');
            document.querySelector('.gallery__books').innerHTML = '';
            activeTheme = event.target.innerText;
            getAndShow();
        }
        if (event.target.classList.contains('gallery__load')) {
            getAndShow();
        }
    });

};

onloading()