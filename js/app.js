const startBtn = document.getElementById('begin-game');

const game = new Game();

startBtn.addEventListener('click', function () {
	game.startGame();
	this.style.display = 'none';
	document.getElementById('play-area').style.opacity = '1';
});
