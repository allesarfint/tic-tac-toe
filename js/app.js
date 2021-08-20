const game = (() => {
    // Player creation logic
    const CreatePlayers = (playerOneName, playerTwoName) => {
        const playerOne = {name: playerOneName, marker: "X"};
        const playerTwo = {name: playerTwoName, marker: "O"};
        return {playerOne, playerTwo}
    }
    
    let players;
    let currentPlayer;

    // Gameboard creation logic
    const Gameboard = () => Array(9)

    let currentGame = Gameboard();

    function generateGameBoard() {
        const gameboardDOM = document.querySelector("#gameboard");
        gameboardDOM.innerHTML = "";

        for (let i = 0; i < currentGame.length; i++) {
            const boardBox = document.createElement("div");
            boardBox.classList.add("boardbox");
            boardBox.dataset.box = i;

            //Gameboard box interativity function, change content when clicked
            boardBox.addEventListener("click", () => {
                if(winner) {
                    return
                }

                const box = document.querySelector(`[data-box="${i}"]`);

                if(box.classList.contains("X") || box.classList.contains("O") || box.textContent) {
                    return
                }

                currentGame[i] = currentPlayer.marker;
                box.textContent = currentPlayer.marker;
                box.classList.add(currentPlayer.marker);

                checkWinner()

                if(winner) {return announceWinner()}

                if(currentPlayer === players.playerOne) {
                    currentPlayer = players.playerTwo;
                } else {currentPlayer = players.playerOne}

                currentName.textContent = currentPlayer.name;
                currentName.classList.toggle("player1");
                currentName.classList.toggle("player2");

            })

            gameboardDOM.appendChild(boardBox);
        }
    }

    // Winning conditions
    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let winner;

    const announceWinner = () => {
        const turn = document.querySelector("#turn");
        turn.textContent = "winner:";
    }

    const checkWinner = () => {
        winStates.forEach(state => {   
            if(!currentGame[state[0]] || !currentGame[state[1]] || !currentGame[state[2]]) {
                return
            }        
            if(currentGame[state[0]] === currentGame[state[1]] && currentGame[state[1]] === currentGame[state[2]]) {
                return winner = currentPlayer.name;
            }
        })
    }


    // Game interactivity    

    const buttonStart = document.querySelector("#button-start");
    const currentName = document.querySelector("#current-name");

        //Generate players object at game start
    buttonStart.addEventListener("click", function generatePlayers() {
        let nameOne = document.querySelector("#player-one-name").value;
        let nameTwo = document.querySelector("#player-two-name").value;

        if(!nameOne) {
            nameOne = "Player 1";
        }
        if(!nameTwo) {
            nameTwo = "Player 2";
        }

        players = CreatePlayers(nameOne, nameTwo);
        currentPlayer = players.playerOne;
        currentName.textContent = currentPlayer.name;
    })

        //Generate Gameboard in DOM at start of the game
    buttonStart.addEventListener("click", generateGameBoard())

        //Hide main menu at game start
    buttonStart.addEventListener("click", function hideMenu() {
        const content = document.querySelector("content");
        const mainMenu = document.querySelector("#main-menu");

        mainMenu.style.visibility = "hidden";
        content.style.filter = "none";
    })

    // Restart game
    const restart = document.querySelector("#restart");

    restart.addEventListener("click", () => {
        generateGameBoard()
        currentPlayer = players.playerOne;

        currentName.textContent = currentPlayer.name;
        currentName.classList.remove("player1", "player2");
        currentName.classList.add("player1");

        currentGame = Gameboard();
        turn.textContent = "turn:"
        winner = "";

    })

    const newGame = document.querySelector("#new-game");

    newGame.addEventListener("click", () => {
        const content = document.querySelector("content");
        const mainMenu = document.querySelector("#main-menu");
        document.querySelector("#player-one-name").value = "";
        document.querySelector("#player-two-name").value = "";
        generateGameBoard()
        currentPlayer = players.playerOne;

        currentName.textContent = currentPlayer.name;
        currentName.classList.remove("player1", "player2");
        currentName.classList.add("player1");

        currentGame = Gameboard();
        turn.textContent = "turn:"
        winner = "";

        mainMenu.style.visibility = "visible";
        content.style.filter = "blur(10px)";
    })
})()