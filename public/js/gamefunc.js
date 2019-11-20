function startCounters() {
  howManyChars = 0;
  howManyWords = 0;
  field.on("input", () => {
    var contents = field.val();
    var howManyChars = contents.length;
    var howManyWords = contents.split(/\S+/).length - 1;
    $("#wordCounter").text(howManyWords);
    $("#characterCounter").text(howManyChars);
  });
}

function startCronos() {
  field.one("focus", () => {
    $("#reStartGame").attr("disabled", true);
    var cronometerID = setInterval(() => {
      var timeLeft = $("#typingTimeLeft").text();
      if (timeLeft < 1) {
        clearInterval(cronometerID);
        endGame();
      } else {
        timeLeft--;
        $("#typingTimeLeft").text(timeLeft);
        // TODO addScore will come here
      }
    }, 1000);
  });
}
