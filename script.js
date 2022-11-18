const cards = document.querySelectorAll('.card');
const field = document.querySelector('.field');
const movesCounter = document.querySelector('.moves-counter span');
const movesModal = document.querySelector('.congratulation-message span');
const tryAgain = document.querySelector('#try-again');

var opened = [];
var matched = 0;
var moves = 0;



for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', (e) => {
		if (opened.length === 2) {
			e.preventDefault();
		} else {
			cards[i].classList.add('opened');
			opened.push(cards[i]);
			addMove();
		}
	});
}

function init() {
	matched = 0;
	moves = 0;

	for (i = 0; i < cards.length; i++) {
		cards[i].classList.remove('match');
	}

	const cardsShuffled = shuffle([...cards]);
	for (let i = 0; i < cardsShuffled.length; i++) {
		field.append(cardsShuffled[i]);
	}

	movesCounter.innerHTML = moves;
	document.querySelector('.modal').setAttribute('style', 'display: none;');
}

function shuffle(array) {
	const cardsTemp = [...array];

	for (let i = cardsTemp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardsTemp[i], cardsTemp[j]] = [cardsTemp[j], cardsTemp[i]];
    }
	return cardsTemp;
}

function addMove() {
	movesCounter.innerHTML = ++moves;

	if (opened.length === 2) {
		if (opened[0].getAttribute('type') != opened[1].getAttribute('type')) {
			setTimeout(() => {
				opened[0].classList.remove('opened');
				opened[1].classList.remove('opened');
				opened = [];
			}, 1000);				
		} else {
			opened[0].classList.remove('opened');
			opened[1].classList.remove('opened');
			opened[0].classList.add('match');
			opened[1].classList.add('match');
			opened = [];
			
			matched += 2;
			if (matched === 16) showModal();
		}
	}
}

function showModal () {
	movesModal.innerHTML = moves;
	document.querySelector('.modal').setAttribute('style', 'display: block;');
}

tryAgain.addEventListener('click', () => {
	init();
});

init();