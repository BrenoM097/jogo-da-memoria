const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(! hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

//função que checa se as cartas são iguais, caso elas sejam executa a função disableCards, caso não a unFlipCards
function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;       
    }

    unFlipCards();
}

// função que remove o eventListener adicionado antes, assim fazendo as cartas nao podendo mais girar
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


//função que gira de volta as cartas que ja fliparam, removendo a classe 'flip'
function unFlipCards() {
    lockBoard = true;
    setTimeout (() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip')

        resetBoard();
    }, 1500);
}
// função que reseta o tabuleiro, tirando as propriedades
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// função de invocação imediata, sua funcionalidade é para embaralhar as cartas.
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition

    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

