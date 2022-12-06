var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTimeKeyPress = true;
var level = 0;

function nextSequence() {
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    level++;

}

function addMouseClickListeners() {
    $(".btn").click(function () {
        var userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);

        if (userClickedPattern.length === gamePattern.length) {
            if (isMatch()) {
                nextSequence();
                userClickedPattern = [];
            }
            else {
                reset();
            }
        }
    }
    );
}

function removeMouseClickListeners()
{
    $(".btn").off('click');
}

function reset() {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 400);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    removeMouseClickListeners()
    firstTimeKeyPress = true;
    $("h1").text("Game Over. Press A key to ReStart");
}

function playSound(name) {
    var filename = "sounds/" + name + ".mp3";
    var audio = new Audio(filename);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 200);
}

function isMatch() {
    if (userClickedPattern.length === gamePattern.length) {
        for (let i = 0; i < gamePattern.length; i++) {
            if (userClickedPattern[i] != gamePattern[i])
                return false;
        }
    }
    else {
        return false;
    }
    return true;
}

$(document).keypress(function (event) {
    if (firstTimeKeyPress) {
        $("h1").text("Level " + level);
        firstTimeKeyPress = false;
        addMouseClickListeners();
        nextSequence();
    }
});