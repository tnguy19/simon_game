buttonColors = [ "red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

hasStarted = false;
var level = 0;

$(document).keypress(function(){
    if (!hasStarted){
        nextSequence();
        hasStarted = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr('id'); 
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1, $(this));
});

function nextSequence (){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var elementChosen = $('#'+randomChosenColor);
    elementChosen.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level "+ level);
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
}

function animatePress(currentColor){
    var elementChosen = $('#'+currentColor);
    elementChosen.addClass("pressed");
    setTimeout(function(){
        elementChosen.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level =0;
    gamePattern = [];
    hasStarted = false;
}


