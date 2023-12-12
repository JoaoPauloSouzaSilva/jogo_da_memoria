const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let playerName;

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
    const cardValue = document.createElement('span');
    cardValue.classList.add('card-value');
    cardValue.innerText = '?';
    card.appendChild(cardValue);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');

        const cardValue = this.querySelector('.card-value');
        cardValue.innerText = cards[this.dataset.index];

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
    } else {
        card1.classList.add('not-matched');
        card2.classList.add('not-matched');

        setTimeout(() => {
            card1.classList.remove('flipped', 'not-matched');
            card2.classList.remove('flipped', 'not-matched');
            const cardValue1 = card1.querySelector('.card-value');
            const cardValue2 = card2.querySelector('.card-value');
            cardValue1.innerText = '?';
            cardValue2.innerText = '?';
        }, 500);
    }

    flippedCards = [];
    moves++;

    if (matchedCards.length === cards.length) {
        showEndGameModal();
    }
}

function showNameModal() {
    const nameModal = document.getElementById('nameModal');
    nameModal.style.display = 'block';
}

function submitName() {
    playerName = document.getElementById('playerNameInput').value;
    const nameModal = document.getElementById('nameModal');
    nameModal.style.display = 'none';
    createBoard();
}

function showEndGameModal() {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-content');
    const movesCount = document.getElementById('movesCount');
    modalContent.innerText = `Jogador: ${playerName}\nParabéns! Você completou o jogo.`;
    movesCount.innerText = ` ${moves}`;
    modal.style.display = 'block';
}

function playAgain() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    resetGame();
}

function resetGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    matchedCards = [];
    moves = 0;
    createBoard();
}

function createBoard() {
    const gameContainer = document.getElementById('game-container');
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach((letter, index) => {
        const card = createCard(letter, index);
        gameContainer.appendChild(card);
    });
}

// Executa a função para mostrar o modal de nome ao carregar a página
document.addEventListener('DOMContentLoaded', showNameModal);
