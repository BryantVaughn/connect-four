class Token {
	constructor(index, owner) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
		this.columnLocation = 0;
	}

	/**
	 * Gets left offset of HTML element
	 * @return {string} Left offset of token object's htmlToken
	 */
	get offsetLeft() {
		return this.htmlToken.offsetLeft;
	}

	/**
	 * Getter to return HTML Token element associated with Token object
	 * @return {DOMElement} The DOM element associated with this Token object
	 */
	get htmlToken() {
		return document.getElementById(`${this.id}`);
	}

	/**
	 * Draws new HTML token
	 */
	drawHTMLToken() {
		const tokenDiv = document.createElement('div');
		document.getElementById('game-board-underlay').appendChild(tokenDiv);
		tokenDiv.setAttribute('id', this.id);
		tokenDiv.setAttribute('class', 'token');
		tokenDiv.style.backgroundColor = this.owner.color;
	}

	/**
	 * Moves HTML token one column to left
	 */
	moveLeft() {
		if (this.columnLocation !== 0) {
			this.htmlToken.style.left = this.offsetLeft - 76;
			this.columnLocation -= 1;
		}
	}

	/**
	 * Moves HTML token one column to right
	 * @param {number} columns - number of columns in the game board
	 */
	moveRight(columns) {
		if (this.columnLocation < columns - 1) {
			this.htmlToken.style.left = this.offsetLeft + 76;
			this.columnLocation += 1;
		}
	}

	/**
	 * Drops HTML token into targeted board space
	 * @param {Object}    target - Targeted space for dropped token.
	 * @param {function}  reset  - The reset function to call after the
	 *                             drop animation has completed.
	 */
	drop(target, reset) {
		this.dropped = true;
		$(this.htmlToken).animate(
			{
				top: target.y * target.diameter
			},
			750,
			'easeOutBounce',
			reset
		);
	}
}
