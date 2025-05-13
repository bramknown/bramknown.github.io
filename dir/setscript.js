import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

const firebaseConfig = { /* your Firebase credentials */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gameStateRef = doc(db, "games", "setGame");

onSnapshot(gameStateRef, (snapshot) => {
    updateBoard(snapshot.data()); // Update UI
});

function updateBoard(data) {
    gameBoard.innerHTML = ""; // Reset board
    data.cards.forEach(card => gameBoard.appendChild(createCard(card)));
}

function updateGameState(cards, scores) {
    updateDoc(gameStateRef, { cards, scores });
}


const gameBoard = document.getElementById("game-board");

function createCard(shape, color, number) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.shape = shape;
    card.dataset.color = color;
    card.dataset.number = number;
    card.innerText = `${shape}-${color}-${number}`;
    card.addEventListener("click", () => selectCard(card));
    return card;
}


function setupGame() {
    for (let i = 1; i <= 12; i++) {
        gameBoard.appendChild(createCard(i));
    }
}

function selectCard(card) {
    card.classList.toggle("selected");
}

let skipVotes = 0;
const playerScores = { player1: 0, player2: 0 };

document.getElementById("skip-button").addEventListener("click", () => {
    skipVotes++;

    if (skipVotes >= 2) {
        swapCards();
        skipVotes = 0; // Reset votes
        deductPointsIfSetExists();
    }
});

function swapCards() {
    const rowStart = Math.floor(Math.random() * 3) * 4; // Random row selection
    const newCards = [];

    for (let i = rowStart; i < rowStart + 4; i++) {
        const newCard = createCard("randomShape", "randomColor", Math.floor(Math.random() * 10));
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
                if (isValidSet([allCards[i], allCards[j], allCards[k]])) {
                    return true;
                }
            }
        }
    }
    return false;
}


setupGame();


