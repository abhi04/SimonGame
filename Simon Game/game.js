var randomGenerateNumber;
var count = 1;
var randomGeneartorArray = [];
var colorArray = ["green", "red", "yellow", "blue"];
var clickedArray = [];
var randomDigit;
var started = 0;

/*
 To generate Random Numbers
*/
function randomNumberGenerator() {
  randomGenerateNumber = Math.random();
  randomGenerateNumber = Math.floor(randomGenerateNumber * 4);
  $("." + colorArray[randomGenerateNumber]).fadeOut();
  setTimeout(function() {
    $("." + colorArray[randomGenerateNumber]).fadeIn();
  }, 100);
  return randomGenerateNumber;
}

/*
 Event Handling when user click the colored Div
*/
function clickButton() {
  $(".btn").click(function() {
    var text = $(this).attr("id");
    $("." + text).addClass("pressed");
    setTimeout(function() {
      $("." + text).removeClass("pressed");
    }, 100);
    audioPlay(text);
    clickedArray.push(colorArray.indexOf(text));
    validate();

  });
}

clickButton();



/*
 Event Handling when user keyPress
*/
function keyPress() {
  $(document).keydown(function() {
    if (started == 0) {
      var randomNumber = randomNumberGenerator();
      randomGeneartorArray.push(randomNumber);
      audioPlay(colorArray[randomNumber]);
      $("h1").text("Level " + count++);
      started = 1;
    }
  });

}


keyPress();

/*
 To Verify Both the array array are same or not.............
*/
function validate() {
  for (var i = 0; i < clickedArray.length; i++) {

    if (clickedArray[i] == randomGeneartorArray[i]) {
      if (clickedArray.length == randomGeneartorArray.length) {
        $("h1").text("Level " + count++);
        randomDigit = randomNumberGenerator();
        audioPlay(colorArray[randomDigit]);
        randomGeneartorArray.push(randomDigit);
        clickedArray = [];
      }
    } else {
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").css("background-color", "red");
      setTimeout(function() {
        $("body").css("background-color", "#011F3f");
      }, 300);
      randomGeneartorArray = [];
      clickedArray = [];
      count = 1;
      var wrong = "wrong";
      audioPlay(wrong);
      started = 0;
    }

  }
}


/*
 Playing the Sound for Different Button
*/

function audioPlay(soundColor) {
  var audio = new Audio("sounds/" + soundColor + ".mp3");
  audio.play();

}
