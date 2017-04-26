function generateWinningNumber(){
	var min = Math.ceil(1);
	var max = Math.floor(100);
	return Math.floor(Math.random() * (max-min + 1) + min);
}

function shuffle(arr){
	var m = arr.length

	while(m){
		var i = Math.floor(Math.random() * m--)

		var temp = arr[m];
		arr[m] = arr[i];
		arr[i] = temp;
	}

	return arr;
}


function Game(){

	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber()

}


Game.prototype.difference = function(){
	return Math.abs(this.playersGuess-this.winningNumber)
}

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber

}


Game.prototype.playersGuessSubmission = function(num){
	if(num < 1 || num > 100 || typeof num !== 'number'){
		throw 'That is an invalid guess.';
	} else {
		this.playersGuess = num;
		
	}

	return this.checkGuess();

}


Game.prototype.checkGuess = function(){

	if(this.playersGuess === this.winningNumber){
		$('h2').text('Click the Reset button to play again!');
		$('#submit').attr('disabled','true');
		$('#hint').attr('disabled','true');
		return 'You Win!';
	}

	if(this.pastGuesses.indexOf(this.playersGuess) > -1){

		return 'You have already guessed that number.';
	}

	this.pastGuesses.push(this.playersGuess);

	$('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
	
	
	if(this.pastGuesses.length > 4){
		$('h2').text('Click the Reset button.');
		$('#submit').attr('disabled','true');
		$('#hint').attr('disabled','true');
		return 'You Lose.';
	}

	if(this.isLower() === true){
		 $('h2').text('Guess a higher number.');
	} else {
		 $('h2').text('Guess a lower number.');

	}
	
	
	if(this.difference() < 10){
		 return 'You\'re burning up!';
	}else if(this.difference() < 25){
		 return 'You\'re lukewarm.';
	}else if(this.difference() < 50){
		 return 'You\'re a bit chilly.';
	}else {
		return 'You\'re ice cold!';
	}



}



function newGame(){
	var nwGame = new Game;
	return nwGame;
}


Game.prototype.provideHint = function(){
	var arr = [];
	arr.push(this.winningNumber)
	while(arr.length < 3){
		arr.push(generateWinningNumber())
	}
	return shuffle(arr);
}



$(document).ready(function(){
	var game = newGame();

	function gameRun(){
		var guess = +$('#player-input').val()
		$('#player-input').val('');
		var output = game.playersGuessSubmission(guess);
		$('#title').text(output);
	}

	$('#submit').on('click', gameRun)


	$('#player-input').keypress(function(event){
		if(event.which == 13){
			gameRun();
		}
	})

	$('#reset').on('click',function(){
		$('#submit').removeAttr('disabled');
		$('#hint').removeAttr('disabled');
		$('#title').text('Play the Guessing Game!')
		$('#subtitle').text('Guess a number between 1-100')

		$('#guess-list li').text('-');
		game = newGame();

	})

	$('#hint').on('click',function(){
		var hints = game.provideHint();
		$('#title').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
	})
});


