const gameBoard = document.getElementById("game-board");
const continuousBtn = document.getElementById("continuous-btn");
const hostBtn = document.getElementById("host-btn");
const multiplayerSetup = document.getElementById("multiplayer-setup");
const peerIdDisplay = document.getElementById("peer-id-display");
const peerIdInput = document.getElementById("peer-id-input");
const connectBtn = document.getElementById("connect-btn");
const skipButton = document.getElementById("skip-button");
const scoreboard = document.getElementById("scoreboard");
const congratsDiv = document.getElementById("congrats");
const finalScores = document.getElementById("final-scores");
const winMessage = document.getElementById("win-message");
const continueButton = document.getElementById("continue-button");
const connectionStatus = document.getElementById("connection-status");
const playerNameInput = document.getElementById("player-name");
const activeGames = document.getElementById("active-games");

const shapes = ["Circle", "Squiggle", "Square"];
const colors = ["Red", "Blue", "Green"];
const fills = ["Solid", "Partial", "Empty"];

let deck = [];
let peer = null;
let conn = null;
let conns = {};
let playerNames = {};
let nextPlayerId = 2;
let isHost = false;
let isMultiplayer = false;
let myPlayerId = 1;
let scores = { 1: 0 };
let gameEnded = false;
let noSetAwarded = false;
let firstSkipper = null;
let continuousMode = false;
let nextCardId = 0;
let publicGames = new Set();

setupGame();

continuousBtn.addEventListener("click", () => {
    continuousMode = !continuousMode;
    continuousBtn.classList.toggle("on", continuousMode);
    continuousBtn.classList.toggle("off", !continuousMode);
});

function generateDeck() {
    const newDeck = [];
    for (let n = 1; n <= 3; n++) {
        for (let c of colors) {
            for (let s of shapes) {
                for (let f of fills) {
                    newDeck.push({ number: n, color: c, shape: s, fill: f });
                }
            }
        }
    }
    for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
}

function getBoardData() {
    return Array.from(gameBoard.children).map(c => ({
        number: c.dataset.number,
        color: c.dataset.color,
        shape: c.dataset.shape,
        fill: c.dataset.fill,
        id: parseInt(c.dataset.id)
    }));
}

function broadcast(data) {
    Object.values(conns).forEach(c => c.send(data));
}

function addCards(num) {
    const newCards = [];
    for (let i = 0; i < num && deck.length > 0; i++) {
        const attrs = deck.pop();
        attrs.id = nextCardId++;
        newCards.push(attrs);
        gameBoard.appendChild(createCard(attrs));
    }
    if (isMultiplayer && isHost && newCards.length > 0) {
        broadcast({ type: "add_cards", cards: newCards });
    }
    return newCards.length;
}

function removeCards(cardIds) {
    cardIds.forEach(id => {
        const card = gameBoard.querySelector(`[data-id="${id}"]`);
        if (card) card.remove();
    });
    if (isMultiplayer && isHost) {
        broadcast({ type: "remove_cards", cardIds });
    }
}

function updateBoardFromData(boardData) {
    gameBoard.innerHTML = "";
    boardData.forEach(attrs => gameBoard.appendChild(createCard(attrs)));
    gameBoard.style.display = "grid";
    skipButton.style.display = "block";
}

function drawShapes(card) {
    const number = parseInt(card.dataset.number);
    const color = card.dataset.color.toLowerCase();
    const shape = card.dataset.shape.toLowerCase();
    const fill = card.dataset.fill.toLowerCase();

    // Use devicePixelRatio for crisp rendering on mobile/retina screens
    const dpr = window.devicePixelRatio || 1;
    const baseWidth = 200, baseHeight = 120;
    const canvas = document.createElement("canvas");
    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;
    canvas.style.width = baseWidth + "px";
    canvas.style.height = baseHeight + "px";
    card.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const shapeScale = 0.7;
    const shapeWidth = 70 * shapeScale;
    const margin = 20;
    const totalShapesWidth = number * shapeWidth + (number - 1) * 10;
    const xStart = margin + (baseWidth - 2 * margin - totalShapesWidth) / 2 + shapeWidth / 2;
    const centerY = baseHeight / 2;

    for (let i = 0; i < number; i++) {
        const x = xStart + i * (shapeWidth + 10);
        ctx.save();
        ctx.translate(x, centerY);
        ctx.rotate(Math.PI / 2);
        ctx.scale(shapeScale, shapeScale);

        ctx.beginPath();
        if (shape === "circle") {
            ctx.ellipse(0, 0, 50, 22, 0, 0, Math.PI * 2);
        } else if (shape === "squiggle") {
            ctx.translate(-54.5, -40);
            ctx.moveTo(104.0, 15.0);
            ctx.bezierCurveTo(112.4, 36.9, 89.7, 60.8, 63.0, 54.0);
            ctx.bezierCurveTo(52.3, 51.3, 42.2, 42.0, 27.0, 53.0);
            ctx.bezierCurveTo(9.6, 65.6, 5.4, 58.3, 5.0, 40.0);
            ctx.bezierCurveTo(4.6, 22.0, 19.1, 9.7, 36.0, 12.0);
            ctx.bezierCurveTo(59.2, 15.2, 61.9, 31.5, 89.0, 14.0);
            ctx.bezierCurveTo(95.3, 10.0, 100.9, 6.9, 104.0, 15.0);
        } else if (shape === "square") {
            ctx.rect(-45, -20, 90, 40);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.stroke();

        if (fill === "solid") {
            ctx.fillStyle = color;
            ctx.fill();
        } else if (fill === "partial") {
            ctx.save();
            ctx.clip();
            ctx.beginPath();
            for (let x = -100; x < 140; x += 8) {
                ctx.moveTo(x, -60);
                ctx.lineTo(x + 100, 70);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
}

// Touch support for card selection (for iOS/Android)
function addTouchSupport(card) {
    card.addEventListener("touchstart", function (e) {
        e.preventDefault();
        card.click();
    }, { passive: false });
}

function createCard(attributes) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.transform = `rotate(${(Math.random() * 10 - 8).toFixed(2)}deg)`;
    Object.assign(card.dataset, attributes);
    card.addEventListener("click", () => handleCardSelection(card));
    addTouchSupport(card);
    drawShapes(card);
    return card;
}

function updateScoreboard() {
    scoreboard.innerHTML = "Leaderboard<br>";
    const sortedIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    sortedIds.forEach id => {
        scoreboard.innerHTML += `${playerNames[id] || `Player ${id}`}: ${scores[id]}<br>`;
    });
}

function setupGame() {
    if (peer) peer.destroy();
    peer = null;
    conn = null;
    conns = {};
    isMultiplayer = false;
    isHost = false;
    myPlayerId = 1;
    scores = { 1: 0 };
    playerNames = { 1: playerNameInput.value || "Player 1" };
    gameEnded = false;
    noSetAwarded = false;
    firstSkipper = null;
    deck = generateDeck();
    nextCardId = 0;
    gameBoard.innerHTML = "";
    addCards(12);
    updateScoreboard();
    congratsDiv.style.display = "none";
    gameBoard.style.display = "grid";
    skipButton.style.display = "block";
    connectionStatus.style.display = "none";
    multiplayerSetup.style.display = "block";
    peerIdDisplay.style.display = "none";
    hostBtn.classList.remove("on");
    hostBtn.classList.add("off");
    updatePublicGames();
}

function handleCardSelection(card) {
    if (gameEnded) return;
    card.classList.toggle("selected", !card.classList.contains("selected"));
    const selected = Array.from(gameBoard.children).filter(c => c.classList.contains("selected"));
    if (selected.length === 3) {
        const cardIds = selected.map(c => parseInt(c.dataset.id));
        if (isMultiplayer && !isHost) {
            conn.send({ type: "check_set", cardIds, player: myPlayerId });
        } else {
            checkSelectedSet(selected, myPlayerId);
        }
    }
}

function checkSelectedSet(selected, player) {
    const cardsData = selected.map(card => ({
        number: card.dataset.number,
        color: card.dataset.color,
        shape: card.dataset.shape,
        fill: card.dataset.fill
    }));
    const currentSize = gameBoard.children.length;
    if (isValidSet(cardsData)) {
        scores[player] = (scores[player] || 0) + 1;
        const cardIds = selected.map(c => parseInt(c.dataset.id));
        removeCards(cardIds);
        if (currentSize <= 12) addCards(3);
    } else {
        scores[player] = (scores[player] || 0) - 1;
        if (isMultiplayer && isHost) {
            broadcast({ type: "invalid_set", to: player });
        }
    }
    selected.forEach(card => card.classList.remove("selected"));
    updateScoreboard();
    if (isMultiplayer && isHost) {
        broadcast({ type: "update_scores", scores });
        broadcast({ type: "update_players", playerNames });
        if (currentSize <= 12) {
            broadcast({ type: "update_board", board: getBoardData() });
        }
    }
}

function handleSkip(player) {
    if (gameEnded) return;
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
            if (continuousMode && (isHost || !isMultiplayer)) {
                restartGame(true);
            } else {
                showCongrats();
            }
            if (isMultiplayer && isHost) {
                broadcast({ type: "game_end" });
            }
        }
    }
    updateScoreboard();
    if (isMultiplayer && isHost) {
        broadcast({ type: "update_scores", scores });
        broadcast({ type: "update_players", playerNames });
        if (deck.length > 0) {
            broadcast({ type: "update_board", board: getBoardData() });
        }
    }
}

skipButton.addEventListener("click", () => {
    if (isMultiplayer && !isHost) {
        conn.send({ type: "skip", player: myPlayerId });
    } else {
        handleSkip(myPlayerId);
    }
});

function showCongrats() {
    gameEnded = true;
    let scoreText = "";
    Object.keys(scores).forEach(id => {
        scoreText += `${playerNames[id] || `Player ${id}`}: ${scores[id]}<br>`;
    });
    finalScores.innerHTML = scoreText;
    if (isMultiplayer) {
        const maxScore = Math.max(...Object.values(scores));
        const winners = Object.keys(scores).filter(id => scores[id] === maxScore);
        winMessage.textContent = winners.includes(myPlayerId.toString())
            ? winners.length > 1
                ? "It's a tie!"
                : "Congratulations, you win!"
            : "Try better next time.";
    } else {
        winMessage.textContent = "";
    }
    congratsDiv.style.display = "block";
    gameBoard.style.display = "none";
    skipButton.style.display = "none";
    connectionStatus.style.display = "none";
}

continueButton.addEventListener("click", () => {
    if (!gameEnded) return;
    if (isMultiplayer && !isHost) {
        conn.send({ type: "request_restart" });
    } else {
        restartGame(false);
        if (isMultiplayer && isHost) {
            broadcast({ type: "restart", board: getBoardData(), scores });
        }
    }
});

function restartGame(keepScore = false) {
    deck = generateDeck();
    nextCardId = 0;
    noSetAwarded = false;
    firstSkipper = null;
    if (!keepScore) {
        scores = isMultiplayer ? Object.fromEntries(Object.keys(playerNames).map(id => [id, 0])) : { 1: 0 };
        if (!isMultiplayer) playerNames = { 1: playerNameInput.value || "Player 1" };
    }
    gameBoard.innerHTML = "";
    addCards(12);
    updateScoreboard();
    gameEnded = false;
    congratsDiv.style.display = "none";
    gameBoard.style.display = "grid";
    skipButton.style.display = "block";
    connectionStatus.textContent = isMultiplayer ? "Connected!" : "";
}

function updatePublicGames() {
    activeGames.innerHTML = "";
    publicGames.forEach(id => {
        const btn = document.createElement("button");
        btn.textContent = id;
        btn.onclick = () => peerIdInput.value = id;
        activeGames.appendChild(btn);
    });
}

hostBtn.addEventListener("click", () => {
    const color = hostBtn.style.backgroundColor;
    if (color === "red") {
        hostBtn.style.backgroundColor = "";
        setupGame();
        connectionStatus.textContent = "Single-player mode";
        connectionStatus.style.display = "block";
        peerIdDisplay.style.display = "none";
        publicGames.delete(peer.id);
        updatePublicGames();
        return;
    }
    if (color === "green") {
        hostBtn.style.backgroundColor = "red";
        deck = generateDeck();
        nextCardId = 0;
        scores = Object.fromEntries(Object.keys(playerNames).map(id => [id, 0]));
        gameBoard.innerHTML = "";
        addCards(12);
        broadcast({ type: "init_board", board: getBoardData() });
        broadcast({ type: "update_scores", scores });
        broadcast({ type: "update_players", playerNames });
        gameBoard.style.display = "grid";
        skipButton.style.display = "block";
        connectionStatus.textContent = `Game started with ${Object.keys(conns).length + 1} players`;
        return;
    }
    hostBtn.style.backgroundColor = "green";
    if (peer) peer.destroy();
    // Use PeerJS config for iOS/Safari compatibility
    const peerConfig = getPeerConfig();
    if (!peerConfig) return; // Abort if Tor
    peer = new Peer(peerConfig);
    conns = {};
    nextPlayerId = 2;
    isMultiplayer = true;
    isHost = true;
    scores = { 1: 0 };
    playerNames = { 1: playerNameInput.value || "Host" };

    peer.on("open", id => {
        peerIdDisplay.textContent = `Share this ID: ${id}`;
        peerIdDisplay.style.display = "block";
        connectionStatus.textContent = "Waiting for players to join...";
        connectionStatus.style.display = "block";
        gameBoard.style.display = "none";
        skipButton.style.display = "none";
        publicGames.add(id);
        updatePublicGames();
        // Simulate broadcasting to all users (in a real app, this would use a server)
        broadcast({ type: "new_game", gameId: id });
    });

    peer.on("connection", connection => {
        connection.on("open", () => {
            const playerId = nextPlayerId++;
            conns[playerId] = connection;
            scores[playerId] = 0;
            playerNames[playerId] = `Player ${playerId}`;
            connection.send({ type: "assign_id", id: playerId });
            broadcast({ type: "update_scores", scores });
            broadcast({ type: "update_players", playerNames });
            updateScoreboard();
            connectionStatus.textContent = `Players joined: ${Object.keys(conns).length}`;
            setupConnection(connection, playerId);
        });
    });

    peer.on("error", err => {
        connectionStatus.textContent = `Error: ${err.type}`;
    });

    peer.on("data", data => {
        if (data.type === "new_game") {
            publicGames.add(data.gameId);
            updatePublicGames();
        }
    });
});

connectBtn.addEventListener("click", () => {
    if (peer) peer.destroy();
    // Use PeerJS config for iOS/Safari compatibility
    const peerConfig = getPeerConfig();
    if (!peerConfig) return; // Abort if Tor
    peer = new Peer(peerConfig);
    peer.on("open", () => {
        conn = peer.connect(peerIdInput.value);
        isHost = false;
        isMultiplayer = true;
        setupConnection(conn);
        connectionStatus.textContent = "Connecting...";
        connectionStatus.style.display = "block";
    });
    peer.on("error", err => {
        connectionStatus.textContent = `Error: ${err.type}`;
    });
    peer.on("data", data => {
        if (data.type === "new_game") {
            publicGames.add(data.gameId);
            updatePublicGames();
        }
    });
});

function setupConnection(connection, playerId = null) {
    connection.on("open", () => {
        if (!isHost) {
            myPlayerId = 0;
            connectionStatus.textContent = "Connected!";
            gameBoard.style.display = "grid";
            skipButton.style.display = "block";
            connection.send({ type: "set_name", name: playerNameInput.value || "Guest" });
        }
    });
    connection.on("data", data => {
        if (data.type === "assign_id") {
            myPlayerId = data.id;
        } else if (data.type === "init_board" || data.type === "update_board") {
            updateBoardFromData(data.board);
        } else if (data.type === "update_scores") {
            scores = data.scores;
            updateScoreboard();
        } else if (data.type === "update_players") {
            playerNames = data.playerNames;
            updateScoreboard();
        } else if (data.type === "invalid_set" && data.to === myPlayerId) {
            gameBoard.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
        } else if (data.type === "game_end") {
            showCongrats();
        } else if (data.type === "restart") {
            updateBoardFromData(data.board);
            scores = data.scores;
            gameEnded = false;
            noSetAwarded = false;
            firstSkipper = null;
            updateScoreboard();
            congratsDiv.style.display = "none";
            gameBoard.style.display = "grid";
            skipButton.style.display = "block";
            connectionStatus.textContent = "Connected!";
        } else if (data.type === "add_cards") {
            data.cards.forEach(attrs => gameBoard.appendChild(createCard(attrs)));
        } else if (data.type === "remove_cards") {
            removeCards(data.cardIds);
        }
    });
    if (isHost && playerId) {
        connection.on("data", data => {
            if (data.type === "set_name") {
                playerNames[playerId] = data.name;
                broadcast({ type: "update_players", playerNames });
                updateScoreboard();
            } else if (data.type === "check_set") {
                const selectedCards = data.cardIds.map(id => gameBoard.querySelector(`[data-id="${id}"]`));
                if (selectedCards.every(c => c)) {
                    checkSelectedSet(selectedCards, data.player);
                }
            } else if (data.type === "skip") {
                handleSkip(data.player);
            } else if (data.type === "request_restart") {
                restartGame(false);
                broadcast({ type: "restart", board: getBoardData(), scores });
            }
        });
    }
    connection.on("close", () => {
        connectionStatus.textContent = "Disconnected";
        gameBoard.style.display = "none";
        skipButton.style.display = "none";
        congratsDiv.style.display = "none";
    });
}

// Polyfill for Element.closest for older browsers (iOS 9, Android 4.4)
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
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
        const unique = new Set(values);
        return unique.size === 1 || unique.size === 3;
    });
}

// PeerJS compatibility workaround for iOS/Safari and Tor Browser
function getPeerConfig() {
    // Use a public PeerServer that supports WebRTC over TURN for iOS/Safari.
    // Tor Browser does not support WebRTC at all, so show a warning.
    let isTor = navigator.userAgent.toLowerCase().includes("torbrowser");
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);
    if (isTor) {
        alert("Tor Browser is not supported because it does not support WebRTC (required for PeerJS).");
        return null;
    }
    // Use PeerServer with TURN for iOS/Safari
    return {
        host: "peerjs.com",
        secure: true,
        port: 443,
        config: {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
                // Free public TURN servers (limited reliability)
                { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
                { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
                { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" }
            ]
        }
    };
}
