var gameArray = ['Ne', 'Ne', 'Ti', 'Ti', 'Na', 'Na', 'Fe', 'Fe', 'Ag', 'Ag', 'Ca', 'Ca', 'Mg', 'Mg', 'He', 'He', 'Cu', 'Cu'];
var cardFlip = 0;
var gameId = []; // NHO: What's a more semantic name for this variable?
var gameValue = []; // NHO: What's a more semantic name for this variable?
Array.prototype.boardShuffle = function() { // NHO: In general, we avoid defining methods on datatype's prototype
  var i = this.length,
    j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  } // NHO: Fischer-yates random^
}

function newBoard() {
  cardFlip = 0;
  var output = '';
  gameArray.boardShuffle();
  for (var i = 0; i < gameArray.length; i++) {
    output += '<div id="block' + i + '" onclick="gameFlip(this,\'' + gameArray[i] + '\')"></div>'; // NHO: We are we attaching onClick listeners here, instead of how we learned in class?
    document.getElementById('boardGame').innerHTML = output;
  }

  function gameFlip(block, val) {
    if (block.innerHTML == "" && gameValue.length < 2) {
      block.style.background = '#FFF';
      block.innerHTML = val;
      if (gameValue.length == 0) {
        gameValue.push(val);
        gameId.push(block.id);
      } else if (gameValue.length == 1) {
        gameValue.push(val);
        gameId.push(block.id);
        if (gameValue[0] == gameValue[1]) {
          cardFlip += 2;
          gameValue = [];
          gameId = [];
          if (cardFlip == gameArray.length) {
            alert("You got all the blocks to match! Starting a new game now...");
            document.getElementById('boardGame').innerHTML = "";
            newBoard();
          }
        } else {
          function flipOver() {
            var matchOne = document.getElementById(gameId[0]);
            var matchTwo = document.getElementById(gameId[1]);
            matchOne.style.background = 'no-repeat'; // NHO: What's this line doing?
            matchOne.innerHTML = "";
            matchTwo.style.background = 'no-repeat'; // NHO: What's this line doing?
            matchTwo.innerHTML = "";
            gameValue = [];
            gameId = [];
          }

          setTimeout(flipOver, 700);
        }
      }
    }
  }
  // NHO: Overall JS looks good, but why are you using only Vanilla JS? Also, make sure to check indentation!
  // I ran your code through Atom's Beautify package to fix spacing, indentation, etc.
