const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function createCard(letter, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = letter;
    card.addEventListener('click', flipCard);
    return card;
}

function createBoard() {
    const gameContainer = document.getElementById('game-container');
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach((letter, index) => {
        const card = createCard(letter, index);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    if (cards[index1] === cards[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');

        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            endGame();
        }
    } else {
        card1.classList.add('not-matched');
        card2.classList.add('not-matched');

        setTimeout(() => {
            card1.classList.remove('flipped', 'not-matched');
            card2.classList.remove('flipped', 'not-matched');
        }, 500);
    }

    flippedCards = [];
    moves++;
}

function endGame() {
    const playerName = prompt('Parabéns! Você completou o jogo. Informe seu nome:');
    alert(`Jogador: ${playerName}\nPontuação: ${moves} movimentos`);

    const playAgain = confirm('Deseja jogar novamente?');
    if (playAgain) {
        resetGame();
    }
}

function resetGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    matchedCards = [];
    moves = 0;
    createBoard();
}

document.addEventListener('DOMContentLoaded', createBoard);
