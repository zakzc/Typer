function endGame() {
  field.attr("disabled", true);
  $("#reStartGame").attr("disabled", false);
  field.toggleClass("typingOff");
  addScore();
}

function zero() {
  console.log("Zeroed game");
  field.attr("disabled", false);
  field.val(" ");
  $("#wordCounter").text(0);
  $("#characterCounter").text(0);
  $("#typingTimeLeft").text("10");
}

function reStartGame() {
  $("#reStartGame").click(() => {
    zero();
    startCounters();
    startCronos();
    field.toggleClass("typingOff");
    field.removeClass("greenBorder");
    field.removeClass("redBorder");
  });
}
