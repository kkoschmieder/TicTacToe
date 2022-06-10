window.onload = function() {
    ticTacToe.init();
}

class gameApp {
    //--Scoreboard counters for both X-player and O-player
    counterX = 0;
    counterO = 0;
    currentPlayer = "X";
    //--All possible ways to win the Tic Tac Toe game, horizontallty, vertically and diagonally
    winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    init() {
        document.querySelectorAll('.game-cell').forEach(cell => cell.addEventListener('click', this.onCellClick));
        document.getElementById('scoreboardReset').addEventListener('click', () => this.scoreboardUpdate('reset'));
    }

    onCellClick = (event) => {
        this.playerMove(event.target);
    }

    playerMove(element) {
       if (element.innerHTML == "X" || element.innerHTML == "O") return;
       element.innerHTML = this.currentPlayer;
       this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
       element.classList.add('disabled');
       this.checkGameStatus();
    }

    checkGameStatus() {
        for (let i = 0; i < this.winningCombinations.length; i++) {
            const variant = this.winningCombinations[i];
            const x = this.getCellValue(variant[0]);
            const y = this.getCellValue(variant[1]);
            const z = this.getCellValue(variant[2]);
            let board = document.querySelectorAll('.game-cell');
            let winnerMessage = document.getElementById('winner-alert');
            if (x == '' || y == '' || z == '') continue;

            if (x == y && y == z) {
                winnerMessage.innerHTML = `Game has ended! The winner is: ${x}`;
                this.scoreboardUpdate(x);
                this.clearGame();
            }

            /* condition that check if all possible game cells are filled which means that game result is a draw, I used negation in order to get true when all cells are filled*/
            if (!document.querySelectorAll('.game-cell:not(.disabled)').length) {
                this.clearGame();
                winnerMessage.innerHTML = 'Game has ended! It is a draw!';
            }
        }
    }

    getCellValue(index) {
        return document.querySelector(`.game-cell[data-index='${index}']`).innerHTML;
    }

    clearGame() {
        this.gameSetup();
    }

    gameSetup() {
        this.currentPlayer = 'X';
        document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = '');
        document.querySelectorAll('.game-cell').forEach(cell => cell.classList.remove('disabled'));
    }

    scoreboardUpdate(winner) {
        switch(winner) {
            case 'X':
                this.counterX++;
                document.getElementById('scoreboardX').innerHTML = this.counterX;
                break;
            case 'O':
                this.counterO++;
                document.getElementById('scoreboardO').innerHTML = this.counterO;
                break;
            case 'reset':
                this.counterX = 0;
                this.counterO = 0;
                document.getElementById('scoreboardX').innerHTML = this.counterX;
                document.getElementById('scoreboardO').innerHTML = this.counterO;
                break;
        }
    }
}

const ticTacToe = new gameApp();