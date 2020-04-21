var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startedGame = false;

$(document).keypress(function() {
  if (!startedGame) {
    startedGame = true;
    nextSequence();
  }
});

$(".btn").click(function(event) {

  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("Nivel: " + level);
  checkCorrect(userClickedPattern.length - 1);

});


function checkCorrect(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("¡Perdiste!, presiona cualquier tecla para continuar");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    starOver();

  }
}

function starOver() {

  level = 0;
  gamePattern = [];
  startedGame = false;
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Nivel " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + (randomChosenColor)).fadeTo(100, 0).fadeTo(100, 1);
  playSound(randomChosenColor);

}

function playSound(name) {

  var audio = new Audio('sounds/' + (name) + '.mp3');
  audio.play()
}

function animatePress(currentColor) {
  
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
