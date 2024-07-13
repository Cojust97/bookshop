const cards = [
    {
        img: 'images/banner-1.jpg'
    },
    {
        img: 'images/banner-2.jpg'
    },
    {
        img: 'images/banner-3.jpg'
    }
];

let currentIndex = 0;

const img = document.querySelector('.slider__image');

const setCards = () => {
    img.style.backgroundImage = `url(${cards[currentIndex].img})`;
};

function next() {
    if (currentIndex === cards.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    setCards();
    addStyle();
};
  
function prev() {
    if (currentIndex === 0) {
      currentIndex = cards.length - 1;
    } else {
      currentIndex -= 1;
    }
    setCards();
    addStyle();
};

const dotsParent = document.querySelector('.slider__dots');

function initSlideElements() {
    cards.forEach((card, index) => {
      dotsParent.innerHTML += `<div class="dot ${index === 0 ? 'active__dot' : ''}" data-index="${index}"></div>`;
    })
};
  
document.addEventListener('click',function(e){
    if (e.target.classList.contains('dot')) {
      currentIndex = Number(e.target.getAttribute('data-index'));
      setCards();
      addStyle();
    }
});

function addStyle() {
    document.querySelector('.dot.active__dot').classList.remove('active__dot');
    document.querySelector(`.dot[data-index="${currentIndex}"]`).classList.add('active__dot');
};

initSlideElements();

setInterval(() => {
    next();
}, 5000);

