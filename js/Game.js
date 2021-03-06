class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}

	/**
	 * Returns active player
	 * @return {Object} player - The active player
	 */
	get activePlayer() {
		return this.players.find((player) => player.active);
	}

	/**
	 * Creates two player objects
	 * @return {Array} An array of two Player objects.
	 */
	createPlayers() {
		const players = [
			new Player('Player 1', 1, '#e15258', true),
			new Player('Player 2', 2, '#e59a13')
		];
		return players;
	}

	/**
	 * Begins game
	 */
	startGame() {
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
	}

	/**
	 * Switches active player
	 */
	switchPlayer() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
	}

	/**
	 * Finds Space object to drop Token into, drops Token
	 */
	playToken() {
		let spaces = this.board.spaces;
		let activeToken = this.activePlayer.activeToken;
		let targetColumn = spaces[activeToken.columnLocation];
		let targetSpace = null;

		for (let space of targetColumn) {
			if (space.token === null) targetSpace = space;
		}

		if (targetSpace) {
			const game = this;
			game.ready = false;
			activeToken.drop(targetSpace, function () {
				game.updateGameState(activeToken, targetSpace);
			});
		}
	}

	/**
	 * Branches code, depending on what key player presses
	 * @param {Object} e - Keydown event object
	 */
	handleKeydown(e) {
		if (this.ready) {
			if (e.key === 'ArrowLeft') {
				this.activePlayer.activeToken.moveLeft();
			} else if (e.key === 'ArrowRight') {
				this.activePlayer.activeToken.moveRight(this.board.columns);
			} else if (e.key === 'ArrowDown') {
				this.playToken();
			}
		}
	}

	/**
	 * Checks if there's a winner on the board after each token drop.
	 * @param  {Object}   target - Targeted space for dropped token.
	 * @return {boolean}  Boolean value indicating whether the game has
	 *                    been won (true) or not (false).
	 */
	checkForWin(target) {
		const owner = target.token.owner;
		let win = false;

		// vertical
		for (let i = 0; i < this.board.columns; i++) {
			for (let j = 0; j < this.board.rows - 3; j++) {
				if (
					this.board.spaces[i][j].owner === owner &&
					this.board.spaces[i][j + 1].owner === owner &&
					this.board.spaces[i][j + 2].owner === owner &&
					this.board.spaces[i][j + 3].owner === owner
				) {
					win = true;
				}
			}
		}

		// horizontal
		for (let i = 0; i < this.board.columns - 3; i++) {
			for (let j = 0; j < this.board.rows; j++) {
				if (
					this.board.spaces[i][j].owner === owner &&
					this.board.spaces[i + 1][j].owner === owner &&
					this.board.spaces[i + 2][j].owner === owner &&
					this.board.spaces[i + 3][j].owner === owner
				) {
					win = true;
				}
			}
		}

		// diagonal
		for (let i = 3; i < this.board.columns; i++) {
			for (let j = 0; j < this.board.rows - 3; j++) {
				if (
					this.board.spaces[i][j].owner === owner &&
					this.board.spaces[i - 1][j + 1].owner === owner &&
					this.board.spaces[i - 2][j + 2].owner === owner &&
					this.board.spaces[i - 3][j + 3].owner === owner
				) {
					win = true;
				}
			}
		}

		// other diagonal
		for (let i = 3; i < this.board.columns; i++) {
			for (let j = 3; j < this.board.rows; j++) {
				if (
					this.board.spaces[i][j].owner === owner &&
					this.board.spaces[i - 1][j - 1].owner === owner &&
					this.board.spaces[i - 2][j - 2].owner === owner &&
					this.board.spaces[i - 3][j - 3].owner === owner
				) {
					win = true;
				}
			}
		}

		return win;
	}

	/**
	 * Displays game over message.
	 * @param {string} message - Game over message.
	 */
	gameOver(message) {
		const gameOverElement = document.getElementById('game-over');
		gameOverElement.textContent = message;
		gameOverElement.style.display = 'block';
	}

	/**
	 * Updates game state after token is dropped.
	 * @param {Object} token  - The token that's being dropped.
	 * @param {Object} target - Targeted space for dropped token.
	 */
	updateGameState(token, target) {
		target.mark(token);

		if (!this.checkForWin(target)) {
			this.switchPlayer();

			if (this.activePlayer.checkTokens()) {
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			} else {
				this.gameOver('No more tokens');
			}
		} else {
			this.gameOver(`${target.owner.name} wins!`);
		}
	}
}
