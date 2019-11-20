//////////////////////////////////////
var field = $(".typingField");
var startTime = $("#typingTimeLeft").text();
//////////////////////////////////////

$(() => {
  startCounters();
  startCronos();
  updatePhraseLength();
  borderColor();
  showScoreButton();
  updateScore();
  $("#reStartGame").click(reStartGame);
  // selectize
  $("#myUsers").selectize({
    create: true,
    sortField: "text"
  });
  $(".tooltip").tooltipster({
    animation: "fade",
    delay: 100,
    theme: "tooltipster-punk",
    trigger: "custom"
  });
});
