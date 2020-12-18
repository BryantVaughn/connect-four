class Token {
	constructor(index, owner) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
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
	 * Getter to return HTML Token element associated with Token object
	 */
	get htmlToken() {
		return document.getElementById(`${this.id}`);
	}
}
