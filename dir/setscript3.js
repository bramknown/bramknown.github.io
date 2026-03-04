const gameBoard = document.getElementById("game-board");
const continuousBtn = document.getElementById("continuous-btn");
const hostBtn = document.getElementById("host-btn");
const publicPrivateBtn = document.getElementById("public-private-btn");
const multiplayerSetup = document.getElementById("multiplayer-setup");
const peerIdDisplay = document.getElementById("peer-id-display");
const peerIdInput = document.getElementById("peer-id-input");
const connectBtn = document.getElementById("connect-btn");
const skipButton = document.getElementById("skip-button");
const scoreboard = document.getElementById("scoreboard");
const scoreDisplay = document.getElementById("score-display");
const scoreText = document.getElementById("score-text");
const congratsDiv = document.getElementById("congrats");
const finalScores = document.getElementById("final-scores");
const winMessage = document.getElementById("win-message");
const continueButton = document.getElementById("continue-button");
const connectionStatus = document.getElementById("connection-status");
const playerNameInput = document.getElementById("player-name");
const activeGames = document.getElementById("active-games");
const joinGameBtn = document.getElementById("join-game-btn");
const joinMenuRight = document.getElementById("join-menu-right");

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
let publicGames = new Map(); // Map of gameId -> {name, isPublic}
let isGamePublic = false; // Initially private
let usedCards = new Set(); // Track cards in continuous mode to avoid duplicates

setupGame();

continuousBtn.addEventListener("click", () => {
    continuousMode = !continuousMode;
    continuousBtn.classList.toggle("on", continuousMode);
    continuousBtn.classList.toggle("off", !continuousMode);
});

publicPrivateBtn.addEventListener("click", () => {
    isGamePublic = !isGamePublic;
    publicPrivateBtn.textContent = isGamePublic ? "Public" : "Private";
    publicPrivateBtn.classList.toggle("on", isGamePublic);
    publicPrivateBtn.classList.toggle("off", !isGamePublic);
});

function highlightNameError() {
    playerNameInput.classList.add("empty-error");
    setTimeout(() => {
        playerNameInput.classList.remove("empty-error");
    }, 2000);
}

function cardToString(card) {
    return `${card.number}-${card.color}-${card.shape}-${card.fill}`;
}

function generateDeck() {
    const newDeck = [];
    for (let n = 1; n <= 3; n++) {
        for (let c of colors) {
            for (let s of shapes) {
                for (let f of fills) {
                    const card = { number: n, color: c, shape: s, fill: f };
                    // In continuous mode, skip cards that have already been used
                    if (!continuousMode || !usedCards.has(cardToString(card))) {
                        newDeck.push(card);
                    }
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
        if (card) {
            // Track card as used in continuous mode
            if (continuousMode) {
                usedCards.add(cardToString({
                    number: card.dataset.number,
                    color: card.dataset.color,
                    shape: card.dataset.shape,
                    fill: card.dataset.fill
                }));
            }
            card.remove();
        }
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
    if (!isMultiplayer) {
        // Single player mode - show score under title, hide leaderboard
        scoreText.innerHTML = `Score: ${scores[1] || 0}`;
        scoreboard.innerHTML = "";
        scoreboard.style.display = "none";
    } else {
        // Multiplayer mode - show leaderboard in top left, show score under title
        scoreText.innerHTML = `Score: ${scores[myPlayerId] || 0}`;
        scoreboard.style.display = "block";
        scoreboard.innerHTML = "Leaderboard<br>";
        const sortedIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        sortedIds.forEach(id => {
            scoreboard.innerHTML += `${playerNames[id] || `Player ${id}`}: ${scores[id]}<br>`;
        });
    }
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
    usedCards.clear();
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
    publicPrivateBtn.style.display = "none";
    joinGameBtn.style.display = "block";
    joinMenuRight.style.display = "none";
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
    // Clear used cards if not keeping continuous mode, otherwise keep them to avoid duplicates
    if (!keepScore) {
        usedCards.clear();
    }
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
    connectionStatus.style.display = "none";
}

function updatePublicGames() {
    activeGames.innerHTML = "";
    publicGames.forEach((gameInfo, gameId) => {
        if (gameInfo.isPublic) {
            const btn = document.createElement("button");
            btn.textContent = `${gameInfo.name || "Game"} (${gameId})`;
            btn.onclick = () => {
                peerIdInput.value = gameId;
            };
            activeGames.appendChild(btn);
        }
    });
}

hostBtn.addEventListener("click", () => {    
    const color = hostBtn.style.backgroundColor;
    if (color === "red") {
        // Stop hosting
        hostBtn.style.backgroundColor = "";
        hostBtn.textContent = "Host";
        publicPrivateBtn.style.display = "none";
        joinGameBtn.style.display = "block";
        setupGame();
        connectionStatus.style.display = "none";
        peerIdDisplay.style.display = "none";
        if (peer && peer.id) {
            publicGames.delete(peer.id);
        }
        updatePublicGames();
        return;
    }
    if (color === "green") {
        // Start game
        hostBtn.style.backgroundColor = "red";
        hostBtn.textContent = "Stop";
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
        updateScoreboard();
        connectionStatus.style.display = "none";
        return;
    }
    
    // Initial click to start hosting
    // Validate that player name was entered
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        highlightNameError();
        return;
    }
    
    // Show public/private button and hide join game button
    publicPrivateBtn.style.display = "block";
    publicPrivateBtn.textContent = "Private";
    publicPrivateBtn.classList.remove("on");
    publicPrivateBtn.classList.add("off");
    isGamePublic = false;
    joinGameBtn.style.display = "none";
    joinMenuRight.style.display = "none";
    
    hostBtn.style.backgroundColor = "green";
    hostBtn.textContent = "Start";
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
    playerNames = { 1: playerName };

    peer.on("open", id => {
        console.log("Peer opened with ID:", id);
        peerIdDisplay.innerHTML = `<strong>Share this ID to invite players:</strong><br><code>${id}</code>`;
        peerIdDisplay.style.display = "block";
        connectionStatus.style.display = "none";
        gameBoard.style.display = "none";
        skipButton.style.display = "none";
        publicGames.set(id, { name: playerName, isPublic: isGamePublic });
        updatePublicGames();
        updateScoreboard();
        // Simulate broadcasting to all users (in a real app, this would use a server)
        broadcast({ type: "new_game", gameId: id, hostName: playerName, isPublic: isGamePublic });
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
            setupConnection(connection, playerId);
        });
    });

    peer.on("error", err => {
        console.error("Peer error:", err);
        connectionStatus.textContent = `Error: ${err.type || "Unknown"} - ${err.message || ""}`;
        connectionStatus.style.display = "block";
    });

    peer.on("data", data => {
        if (data.type === "new_game") {
            publicGames.set(data.gameId, { name: data.hostName || "Game", isPublic: data.isPublic !== false });
            updatePublicGames();
        }
    });
});

joinGameBtn.addEventListener("click", () => {
    // Validate that player name was entered
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        highlightNameError();
        return;
    } else {
        joinMenuRight.style.display = joinMenuRight.style.display === "none" || joinMenuRight.style.display === "" ? "flex" : "none";
    }
});

connectBtn.addEventListener("click", () => {    // Validate game ID is entered
    const gameId = peerIdInput.value.trim();
    if (!gameId) {
        alert("Please enter a Game ID to join.");
        return;
    }
    
    // Disable multiplayer on localhost - only works on HTTPS/GitHub Pages
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
        alert("Multiplayer requires HTTPS. Test on GitHub Pages or a secure host.\nLocal testing is limited to single-player mode.");
        return;
    }
    
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
        connectionStatus.style.display = "none";
        joinMenuRight.style.display = "none";
    });
    peer.on("error", err => {
        connectionStatus.textContent = `Error: ${err.type}`;
        connectionStatus.style.display = "block";
    });
    peer.on("data", data => {
        if (data.type === "new_game") {
            publicGames.set(data.gameId, { name: data.hostName || "Game", isPublic: data.isPublic !== false });
            updatePublicGames();
        }
    });
});

// Attach connect button to peer ID input (enter key)
peerIdInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        connectBtn.click();
    }
});

function setupConnection(connection, playerId = null) {
    connection.on("open", () => {
        if (!isHost) {
            myPlayerId = 0;
            connectionStatus.style.display = "none";
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
            connectionStatus.style.display = "none";
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
        connectionStatus.style.display = "none";
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

// PeerJS compatibility workaround for iOS/Safari, Brave, and Tor Browser
function getPeerConfig() {
    let userAgent = navigator.userAgent.toLowerCase();
    let isTor = userAgent.includes("torbrowser");
    // Brave detection is tricky — userAgent often mimics Chrome now
    let isBrave = userAgent.includes("brave") || 
                  (navigator.brave && await navigator.brave.isBrave());
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isTor) {
        alert("Tor Browser is not supported because it disables WebRTC (required for PeerJS).");
        return null;
    }
    return {
        host: "0.peerjs.com",
        secure: true,
        port: 443,
        path: "/",
        debug: 2,
        config: {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:stun2.l.google.com:19302" },
                { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
                { 
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                },
                { 
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                },
                { 
                    urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    username: "openrelayproject",
                    credential: "openrelayproject"
                }
                // Optional extras if you hit limits:
                // { urls: "stun:stun.nextcloud.com:3478" }
            ]
        }
    };
}
