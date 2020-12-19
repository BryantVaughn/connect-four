const startBtn = document.getElementById('begin-game');
const instructions = document.querySelector('.instructions');

const game = new Game();

startBtn.addEventListener('click', function () {
	game.startGame();
	this.style.display = 'none';
	instructions.style.display = 'block';
	document.getElementById('play-area').style.opacity = '1';
});

document.addEventListener('keydown', function (evt) {
	game.handleKeydown(evt);
});
