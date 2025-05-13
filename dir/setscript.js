import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

const firebaseConfig = { /* Your Firebase credentials */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gameStateRef = doc(db, "games", "setGame");

onSnapshot(gameStateRef, (snapshot) => {
    updateBoard(snapshot.data());
});

function updateBoard(data) {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    data.cards.forEach(card => gameBoard.appendChild(createCard(card))); 
}

function updateGameState(cards, scores) {
    updateDoc(gameStateRef, { cards: cards.map(card => ({
        number: card.dataset.number,
        color: card.dataset.color,
        shape: card.dataset.shape,
        fill: card.dataset.fill
    })), scores });
}

const gameBoard = document.getElementById("game-board");

const shapes = ["Circle", "Triangle", "Square"];
const colors = ["Red", "Blue", "Green"];
const fills = ["Solid", "Partial", "Empty"];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createCard(attributes = null) {
    const card = document.createElement("div");
    card.className = "card";

    if (attributes) {
        card.dataset.number = attributes.number;
        card.dataset.color = attributes.color;
        card.dataset.shape = attributes.shape;
        card.dataset.fill = attributes.fill;
    } else {
        card.dataset.number = Math.floor(Math.random() * 3) + 1;
        card.dataset.color = getRandomElement(colors);
        card.dataset.shape = getRandomElement(shapes);
        card.dataset.fill = getRandomElement(fills);
    }

    card.addEventListener("click", () => card.classList.toggle("selected"));
    return card;
}

function setupGame() {
    for (let i = 1; i <= 12; i++) {
        document.getElementById("game-board").appendChild(createCard());
    }
}

setupGame();

let skipVotes = 0;
const playerScores = { player1: 0, player2: 0 };

document.getElementById("skip-button").addEventListener("click", () => {
    skipVotes++;

    if (skipVotes >= 2) {
        swapCards();
        skipVotes = 0;
        deductPointsIfSetExists();
    }
});

function swapCards() {
    const rowStart = Math.floor(Math.random() * 3) * 4;
    const newCards = [];

    for (let i = rowStart; i < rowStart + 4; i++) {
        const newCard = createCard();
        gameBoard.children[i].replaceWith(newCard);
        newCards.push(newCard);
    }

    updateGameState(newCards, playerScores);
}

function deductPointsIfSetExists() {
    if (checkRemainingSets()) {
        playerScores.player1--;
        playerScores.player2--;
        updateScoreboard();
    }
}

function updateScoreboard() {
    document.getElementById("player1-score").innerText = playerScores.player1;
    document.getElementById("player2-score").innerText = playerScores.player2;
}

function checkRemainingSets() {
    const allCards = Array.from(gameBoard.children);
    
    for (let i = 0; i < allCards.length - 2; i++) {
        for (let j = i + 1; j < allCards.length - 1; j++) {
            for (let k = j + 1; k < allCards.length; k++) {
                const selectedCards = [allCards[i], allCards[j], allCards[k]].map(card => ({
                    number: card.dataset.number,
                    color: card.dataset.color,
                    shape: card.dataset.shape,
                    fill: card.dataset.fill
                }));

                if (isValidSet(selectedCards)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isValidSet(cards) {
    if (cards.length !== 3) return false;

    const attributes = ["number", "color", "shape", "fill"];
    return attributes.every(attr => {
        const values = cards.map(card => card[attr]);
        return new Set(values).size === 1 || new Set(values).size === 3;
    });
}
