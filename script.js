var gameArray = ['Ne','Ne','Ti','Ti','Na','Na','Fe','Fe','Ag','Ag','Ca','Ca','Mg','Mg','He','He','Cu','Cu'];
var cardFlip = 0;
var gameId = [];
var gameValue = [];
Array.prototype.boardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	cardFlip = 0;
	var output = '';
    gameArray.boardShuffle();
	for(var i = 0; i < gameArray.length; i++){
		output += '<div id="block'+i+'" onclick="gameFlip(this,\''+gameArray[i]+'\')"></div>';
	}
	document.getElementById('boardGame').innerHTML = output;
}

function gameFlip(block, val){
	if(block.innerHTML == "" && gameValue.length < 2){
		block.style.background = '#FFF';
		block.innerHTML = val;
		if(gameValue.length == 0){
			gameValue.push(val);
			gameId.push(block.id);
		} 
		else if(gameValue.length == 1){
			gameValue.push(val);
			gameId.push(block.id);
			if(gameValue[0] == gameValue[1]){
				cardFlip += 2;
				gameValue = [];
            	gameId = [];
				if(cardFlip == gameArray.length){
					alert("You got all the blocks to match! Starting a new game now...");
					document.getElementById('boardGame').innerHTML = "";
					newBoard();
				}
			} else {
				function flipOver(){
				    var matchOne = document.getElementById(gameId[0]);
				    var matchTwo = document.getElementById(gameId[1]);
				    matchOne.style.background = 'no-repeat';
            	    matchOne.innerHTML = "";
				    matchTwo.style.background = 'no-repeat';
            	    matchTwo.innerHTML = "";
				    gameValue = [];
            	    gameId = [];
				}

				setTimeout(flipOver, 700);
			}
		}
	}
}