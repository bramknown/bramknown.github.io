const gameBoard = document.getElementById("game-board");
const continuousCheck = document.getElementById("continuous");
const singleRadio = document.querySelector('input[value="single"]');
const multiRadio = document.querySelector('input[value="multi"]');
const multiSetup = document.getElementById("multi-setup");
const hostBtn = document.getElementById("host-btn");
const joinBtn = document.getElementById("join-btn");
const peerIdDisplay = document.getElementById("peer-id-display");
const joinInput = document.getElementById("join-input");
const peerIdInput = document.getElementById("peer-id-input");
const connectBtn = document.getElementById("connect-btn");
const skipButton = document.getElementById("skip-button");
const scoreboard = document.getElementById("scoreboard");
const congratsDiv = document.getElementById("congrats");
const finalScores = document.getElementById("final-scores");
const winMessage = document.getElementById("win-message");
const continueButton = document.getElementById("continue-button");
const connectionStatus = document.getElementById("connection-status");

const shapes = ["Circle", "Squiggle", "Square"];
const colors = ["Red", "Blue", "Green"];
const fills = ["Solid", "Partial", "Empty"];

let deck = [];
let peer = null;
let conn = null;
let isHost = false;
let isMultiplayer = false;
let myPlayerId = 1;
let scores = {1: 0};
let gameEnded = false;
let noSetAwarded = false;
let nextCardId = 0;
let firstSkipper = null;

function generateDeck() {
    const deck = [];
    for (let n = 1; n <= 3; n++) {
        for (let c of colors) {
            for (let s of shapes) {
                for (let f of fills) {
                    deck.push({ number: n, color: c, shape: s, fill: f });
                }
            }
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("Deck generated with", deck.length, "cards");
    return deck;
}

function addCards(num) {
    const newCards = [];
    for (let i = 0; i < num; i++) {
        if (deck.length > 0) {
            const attrs = deck.pop();
            attrs.id = nextCardId++;
            newCards.push({ ...attrs }); // Create a copy to avoid reference issues
            gameBoard.appendChild(createCard(attrs));
        }
    }
    if (isMultiplayer && isHost && newCards.length > 0) {
        console.log("Host sending add_cards:", newCards);
        conn.send({type: 'add_cards', cards: newCards});
    }
}

function removeCards(cardIds) {
    cardIds.forEach(id => {
        const card = Array.from(gameBoard.children).find(c => c.dataset.id === id.toString());
        if (card) card.remove();
    });
    if (isMultiplayer && isHost) {
        console.log("Host sending remove_cards:", cardIds);
        conn.send({type: 'remove_cards', cardIds: cardIds});
    }
}

function updateBoardFromData(boardData) {
    console.log("Updating board with data:", boardData);
    gameBoard.innerHTML = '';
    boardData.forEach(attrs => {
        gameBoard.appendChild(createCard(attrs));
    });
    gameBoard.style.display = 'grid';
    skipButton.style.display = 'block';
}

function drawShapes(card) {
    const number = parseInt(card.dataset.number);
    const color = card.dataset.color.toLowerCase();
    const shape = card.dataset.shape.toLowerCase();
    const fill = card.dataset.fill.toLowerCase();

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 120;
    card.appendChild(canvas);
    const context = canvas.getContext("2d");

    const shapeScale = 0.7;
    const shapeWidth = 70 * shapeScale;
    const margin = 20;
    const totalShapesWidth = number * shapeWidth + (number - 1) * 10;
    const xStart = margin + (canvas.width - 2 * margin - totalShapesWidth) / 2 + shapeWidth / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < number; i++) {
        const x = xStart + i * (shapeWidth + 10);
        context.save();
        context.translate(x, centerY);
        context.rotate(Math.PI / 2);
        context.scale(shapeScale, shapeScale);

        context.beginPath();
        if (shape === "circle") {
            context.ellipse(0, 0, 50, 22, 0, 0, Math.PI * 2);
        } else if (shape === "squiggle") {
            context.translate(-54.5, -40);
            context.moveTo(104.0, 15.0);
            context.bezierCurveTo(112.4, 36.9, 89.7, 60.8, 63.0, 54.0);
            context.bezierCurveTo(52.3, 51.3, 42.2, 42.0, 27.0, 53.0);
            context.bezierCurveTo(9.6, 65.6, 5.4, 58.3, 5.0, 40.0);
            context.bezierCurveTo(4.6, 22.0, 19.1, 9.7, 36.0, 12.0);
            context.bezierCurveTo(59.2, 15.2, 61.9, 31.5, 89.0, 14.0);
            context.bezierCurveTo(95.3, 10.0, 100.9, 6.9, 104.0, 15.0);
            context.lineCap = "round";
            context.lineWidth = 5.0;
        } else if (shape === "square") {
            context.rect(-45, -20, 90, 40);
        }

        context.strokeStyle = color;
        context.lineWidth = 5.0;
        context.stroke();

        if (fill === "solid") {
            context.fillStyle = color;
            context.fill();
        } else if (fill === "partial") {
            context.save();
            context.clip();
            context.beginPath();
            for (let x = -100; x < 140; x += 8) {
                context.moveTo(x, -60);
                context.lineTo(x + 100, 70);
            }
            context.strokeStyle = color;
            context.lineWidth = 2.5;
            context.stroke();
            context.restore();
        }

        context.restore();
    }
}

function createCard(attributes) {
    const card = document.createElement("div");
    card.className = "card";
    const angle = (Math.random() * 10 - 8).toFixed(2);
    card.style.transform = `rotate(${angle}deg)`;
    card.dataset.number = attributes.number;
    card.dataset.color = attributes.color;
    card.dataset.shape = attributes.shape;
    card.dataset.fill = attributes.fill;
    card.dataset.id = attributes.id.toString();
    card.addEventListener("click", () => handleCardSelection(card));
    drawShapes(card);
    return card;
}

function updateScoreboard() {
    if (isMultiplayer) {
        const myScore = scores[myPlayerId] || 0;
        const opponentId = myPlayerId === 1 ? 2 : 1;
        const opponentScore = scores[opponentId] || 0;
        scoreboard.innerHTML = `My Score: ${myScore} | Opponent Score: ${opponentScore}`;
    } else {
        scoreboard.innerHTML = `Player: ${scores[1]}`;
    }
}

function setupGame() {
    if (peer) peer.destroy();
    peer = null;
    conn = null;
    isMultiplayer = multiRadio.checked;
    gameEnded = false;
    noSetAwarded = false;
    firstSkipper = null;
    if (isMultiplayer) {
        scores = {1: 0, 2: 0};
        multiSetup.style.display = 'block';
        gameBoard.style.display = 'none';
        skipButton.style.display = 'none';
        connectionStatus.style.display = 'block';
        connectionStatus.textContent = 'Select Host or Join to start multiplayer';
        updateScoreboard();
        congratsDiv.style.display = 'none';
    } else {
        scores = {1: 0};
        myPlayerId = 1;
        deck = generateDeck();
        nextCardId = 0;
        gameBoard.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const attrs = deck.pop();
            attrs.id = nextCardId++;
            gameBoard.appendChild(createCard(attrs));
        }
        updateScoreboard();
        congratsDiv.style.display = 'none';
        gameBoard.style.display = 'grid';
        skipButton.style.display = 'block';
        connectionStatus.style.display = 'none';
    }
}

function handleCardSelection(card) {
    if (gameEnded) return;
    const selected = Array.from(gameBoard.children).filter(c => c.classList.contains("selected"));
    if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        return;
    }
    if (selected.length >= 3) {
        return;
    }
    card.classList.add("selected");
    const newSelected = Array.from(gameBoard.children).filter(c => c.classList.contains("selected"));
    if (newSelected.length === 3) {
        if (isMultiplayer) {
            const cardIds = newSelected.map(c => c.dataset.id);
            console.log("Checking set with cards:", cardIds, "by player", myPlayerId);
            conn.send({type: 'check_set', cardIds: cardIds, player: myPlayerId});
            if (isHost) {
                checkSelectedSet(newSelected, myPlayerId);
            }
        } else {
            checkSelectedSet(newSelected, 1);
        }
    }
}

function checkSelectedSet(selected, player) {
    console.log("Checking set for player", player, "with cards:", selected.map(c => c.dataset));
    const cardsData = selected.map(card => ({
        number: card.dataset.number,
        color: card.dataset.color,
        shape: card.dataset.shape,
        fill: card.dataset.fill
    }));
    const currentSize = gameBoard.children.length;
    if (isValidSet(cardsData)) {
        scores[player] += 1;
        updateScoreboard();
        const cardIds = selected.map(card => card.dataset.id);
        console.log("Valid set found, removing cards:", cardIds);
        removeCards(cardIds);
        if (currentSize <= 12) {
            addCards(3);
        }
        selected.forEach(card => card.classList.remove("selected"));
    } else {
        scores[player] -= 1;
        updateScoreboard();
        selected.forEach(card => card.classList.remove("selected"));
        if (isMultiplayer) {
            conn.send({type: 'invalid_set', to: player});
        }
    }
    if (isMultiplayer && isHost) {
        console.log("Host sending update_scores:", scores);
        conn.send({type: 'update_scores', scores: scores});
        if (currentSize <= 12) {
            conn.send({type: 'update_board', board: Array.from(gameBoard.children).map(c => c.dataset)});
        }
    }
}

skipButton.addEventListener("click", () => {
    if (gameEnded) return;
    console.log("Skip button clicked by player", myPlayerId);
    if (isMultiplayer) {
        conn.send({type: 'skip', player: myPlayerId});
        handleSkip(myPlayerId); // Ensure host processes skip locally
    } else {
        if (checkRemainingSets()) {
            scores[1] -= 1;
            updateScoreboard();
        } else {
            if (!noSetAwarded) {
                scores[1] += 1;
                noSetAwarded = true;
                updateScoreboard();
            }
            if (deck.length > 0) {
                addCards(3);
                noSetAwarded = false;
            } else {
                showCongrats();
            }
        }
    }
});

function handleSkip(player) {
    console.log("Handling skip for player", player);
    if (checkRemainingSets()) {
        scores[player] -= 1;
    } else {
        if (!noSetAwarded) {
            firstSkipper = firstSkipper || player;
            if (firstSkipper === player) {
                scores[player] += 1;
                noSetAwarded = true;
            }
        }
        if (deck.length > 0) {
            addCards(3);
            noSetAwarded = false;
            firstSkipper = null;
        } else {
            showCongrats();
            if (isHost) {
                conn.send({type: 'game_end'});
            }
        }
    }
    updateScoreboard(); // Ensure scoreboard updates after skip
    if (isMultiplayer && isHost) {
        console.log("Host sending update_scores after skip:", scores);
        conn.send({type: 'update_scores', scores: scores});
        if (deck.length > 0) {
            conn.send({type: 'update_board', board: Array.from(gameBoard.children).map(c => c.dataset)});
        }
    }
}

function showCongrats() {
    gameEnded = true;
    let scoreText = isMultiplayer ? `Player1: ${scores[1] || 0}<br>Player2: ${scores[2] || 0}` : `Player: ${scores[1]}`;
    finalScores.innerHTML = scoreText;
    if (isMultiplayer) {
        const other = myPlayerId === 1 ? 2 : 1;
        if (scores[myPlayerId] > (scores[other] || 0)) {
            winMessage.textContent = "Congratulations, you win!";
        } else if (scores[myPlayerId] < (scores[other] || 0)) {
            winMessage.textContent = "Try better next time.";
        } else {
            winMessage.textContent = "It's a tie!";
        }
    } else {
        winMessage.textContent = "";
    }
    congratsDiv.style.display = 'block';
    gameBoard.style.display = 'none';
    skipButton.style.display = 'none';
    connectionStatus.style.display = 'none';
    if (continuousCheck.checked && !gameEnded) {
        setTimeout(() => {
            if (isMultiplayer && isHost) {
                restartGame();
                conn.send({type: 'restart', board: Array.from(gameBoard.children).map(c => c.dataset)});
            } else if (isMultiplayer) {
                conn.send({type: 'request_restart'});
            } else {
                restartGame();
            }
        }, 5000);
    }
}

continueButton.addEventListener("click", () => {
    if (gameEnded) {
        if (isMultiplayer) {
            if (isHost) {
                restartGame();
                conn.send({type: 'restart', board: Array.from(gameBoard.children).map(c => c.dataset)});
            } else {
                conn.send({type: 'request_restart'});
            }
        } else {
            restartGame();
        }
    }
});

function restartGame() {
    gameBoard.innerHTML = '';
    deck = generateDeck();
    nextCardId = 0;
    noSetAwarded = false;
    firstSkipper = null;
    scores = isMultiplayer ? {1: 0, 2: 0} : {1: 0};
    updateScoreboard();
    for (let i = 0; i < 12; i++) {
        const attrs = deck.pop();
        attrs.id = nextCardId++;
        gameBoard.appendChild(createCard(attrs));
    }
    if (isMultiplayer && isHost) {
        console.log("Host sending initial board after restart:", Array.from(gameBoard.children).map(c => c.dataset));
        conn.send({type: 'init_board', board: Array.from(gameBoard.children).map(c => c.dataset)});
    }
    gameEnded = false;
    congratsDiv.style.display = 'none';
    gameBoard.style.display = 'grid';
    skipButton.style.display = 'block';
    connectionStatus.textContent = isMultiplayer ? 'Connected to opponent!' : '';
}

hostBtn.addEventListener('click', () => {
    if (peer) peer.destroy();
    peer = new Peer();
    peer.on('open', id => {
        isHost = true;
        myPlayerId = 1;
        peerIdDisplay.textContent = 'Share this ID: ' + id;
        peerIdDisplay.style.display = 'block';
        multiSetup.style.display = 'none';
        connectionStatus.textContent = 'Waiting for opponent to join...';
        connectionStatus.style.display = 'block';
    });
    peer.on('connection', connection => {
        conn = connection;
        setupConnection();
        deck = generateDeck();
        connectionStatus.textContent = 'Connected to opponent!';
        updateScoreboard();
    });
    peer.on('error', err => {
        connectionStatus.textContent = 'Error: ' + err.type;
    });
});

joinBtn.addEventListener('click', () => {
    multiSetup.style.display = 'none';
    joinInput.style.display = 'block';
    connectionStatus.textContent = 'Enter Host ID to join';
    connectionStatus.style.display = 'block';
});

connectBtn.addEventListener('click', () => {
    if (peer) peer.destroy();
    peer = new Peer();
    peer.on('open', id => {
        conn = peer.connect(peerIdInput.value);
        isHost = false;
        myPlayerId = 2;
        setupConnection();
        joinInput.style.display = 'none';
        connectionStatus.textContent = 'Connecting to host...';
        deck = []; // Prevent joiner from generating its own deck
    });
    peer.on('error', err => {
        connectionStatus.textContent = 'Error: ' + err.type;
    });
});

function setupConnection() {
    conn.on('open', () => {
        console.log('Connected to peer');
        connectionStatus.textContent = 'Connected to opponent!';
        if (!isHost) {
            gameBoard.style.display = 'grid';
            skipButton.style.display = 'block';
        }
        nextCardId = 0;
        scores = {1: 0, 2: 0};
        gameBoard.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const attrs = deck.pop();
            attrs.id = nextCardId++;
            gameBoard.appendChild(createCard(attrs));
        }
        console.log("Host sending initial board:", Array.from(gameBoard.children).map(c => ({...c.dataset, id: c.dataset.id})));
        conn.send({type: 'init_board', board: Array.from(gameBoard.children).map(c => ({...c.dataset, id: c.dataset.id}))});
        gameBoard.style.display = 'grid';
        skipButton.style.display = 'block';
    });
    conn.on('data', data => {
        console.log("Received data:", data);
        if (data.type === 'init_board') {
            updateBoardFromData(data.board.map(card => ({...card, id: card.id})));
            scores = {1: 0, 2: 0};
            updateScoreboard();
            connectionStatus.textContent = 'Connected to opponent!';
        } else if (data.type === 'update_board') {
            updateBoardFromData(data.board.map(card => ({...card, id: card.id})));
        } else if (data.type === 'update_scores') {
            scores = data.scores;
            updateScoreboard();
        } else if (data.type === 'invalid_set') {
            if (data.to === myPlayerId) {
                Array.from(gameBoard.children).forEach(c => c.classList.remove('selected'));
            }
        } else if (data.type === 'game_end') {
            showCongrats();
        } else if (data.type === 'check_set') {
            if (isHost) {
                const selectedCards = data.cardIds.map(id => Array.from(gameBoard.children).find(c => c.dataset.id === id.toString()));
                if (selectedCards.every(c => c)) {
                    checkSelectedSet(selectedCards, data.player);
                    conn.send({type: 'update_scores', scores: scores});
                    if (gameBoard.children.length <= 12) {
                        conn.send({type: 'update_board', board: Array.from(gameBoard.children).map(c => ({...c.dataset, id: c.dataset.id}))});
                    }
                }
            }
        } else if (data.type === 'skip') {
            if (isHost) {
                handleSkip(data.player);
            }
        } else if (data.type === 'request_restart') {
            if (isHost) {
                restartGame();
                conn.send({type: 'restart', board: Array.from(gameBoard.children).map(c => ({...c.dataset, id: c.dataset.id}))});
            }
        } else if (data.type === 'restart') {
            updateBoardFromData(data.board.map(card => ({...card, id: card.id})));
            scores = {1: 0, 2: 0};
            gameEnded = false;
            noSetAwarded = false;
            firstSkipper = null;
            updateScoreboard();
            congratsDiv.style.display = 'none';
            gameBoard.style.display = 'grid';
            skipButton.style.display = 'block';
            connectionStatus.textContent = 'Connected to opponent!';
        } else if (data.type === 'add_cards') {
            if (!isHost) {
                data.cards.forEach(attrs => {
                    gameBoard.appendChild(createCard(attrs));
                });
            }
        } else if (data.type === 'remove_cards') {
            if (!isHost) {
                data.cardIds.forEach(id => {
                    const card = Array.from(gameBoard.children).find(c => c.dataset.id === id.toString());
                    if (card) card.remove();
                });
            }
        }
    });
    conn.on('close', () => {
        connectionStatus.textContent = 'Disconnected from opponent';
        gameBoard.style.display = 'none';
        skipButton.style.display = 'none';
        multiSetup.style.display = 'block';
        congratsDiv.style.display = 'none';
    });
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

multiRadio.addEventListener('change', setupGame);
singleRadio.addEventListener('change', setupGame);

setupGame();
