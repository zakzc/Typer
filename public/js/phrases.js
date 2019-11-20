$("#changeSentenceButton").click(newRandomPhrase);
$("#chooseNewPhrase").click(chooseNewPhrase);

function newRandomPhrase() {
  $("#spinWheel").show();
  console.log("Activated con with server");
  $.get("http://localhost:3000/frases", changeRandomPhrase)
    .fail(function() {
      $("#requestError").show();
      setTimeout(function() {
        $("#requestError").toggle();
      }, 2000);
    })
    .always(function() {
      $("#spinWheel").toggle();
    });
}

function changeRandomPhrase(data) {
  console.log("requisition sent: ", data, "returned");
  var newPhrase = $("#phraseToCopy");
  var randomNo = Math.floor(Math.random() * data.length);
  newPhrase.text(data[randomNo].texto);
  var newTime = data[randomNo].tempo;
  updatePhraseLength();
  updatePhraseTime(newTime);
  // console.log("new : ", data[0].texto);
}

function updatePhraseLength() {
  var phrase = $("#phraseToCopy").text();
  var totalNumbWords = phrase.trim().split(" ").length;
  // console.log("TOTALNUMBWORDS", totalNumbWords);
  var sizeOfSentence = $("#sizeOfSentence");
  sizeOfSentence.text(totalNumbWords);
}

function chooseNewPhrase() {
  $("#spinWheel").show();
  var numberChosen = $("#inputNewPhrase").val();
  var data = { id: numberChosen };
  $.get("http://localhost:3000/frases", data, changeThisPhrase)
    .fail(function() {
      $("#requestError").show();
      setTimeout(function() {
        $("#requestError").toggle();
      }, 2000);
    })
    .always(function() {
      $("#spinWheel").toggle();
    });
}

function changeThisPhrase(data) {
  console.log(data.texto);
  var phrase = $("#phraseToCopy");
  phrase.text(data.texto);
  updatePhraseLength();
  updatePhraseTime(data.tempo);
}

function updatePhraseTime(data) {
  var typingTime = $("#typingTimeLeft");
  var timeLeft = data;
  console.log("TIMELEFT", timeLeft);
  typingTime.text(timeLeft);
}
