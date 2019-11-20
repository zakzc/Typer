$("#syncronizeMe").click(syncScore);

function addScore() {
  var tableBody = $(".score").find("tbody");
  var numbWords = $("#wordCounter").text();
  var user = $("#myUsers").val();
  var line = newLine(user, numbWords);
  line.find(".removeScoreButton").click(removeScore);
  tableBody.prepend(line);
  $(".score").slideDown(500);
  scrollScore();
}

function scrollScore() {
  var positionOfScore = $(".score").offset().top;
  $("body").animate({ scrollTop: "60px" }, 800);
}

function newLine(user, numbWords) {
  var newLine = $("<tr>");
  var columnUser = $("<td>").text(user);
  var columnWords = $("<td>").text(numbWords);
  var columnRemove = $("<td>");
  var link = $("<a>")
    .addClass("removeScoreButton")
    .attr("href", "#");
  var deleteIcon = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete");
  link.append(deleteIcon);
  columnRemove.append(link);
  newLine.append(columnUser);
  newLine.append(columnWords);
  newLine.append(columnRemove);
  return newLine;
}

function removeScore() {
  event.preventDefault();
  var eraseMe = $(this)
    .parent()
    .parent();

  eraseMe.fadeOut();
  setTimeout(() => {
    eraseMe.remove();
  }, 800);
}

function showScoreButton() {
  $("#showScoreButton").click(showScore);
  function showScore() {
    $(".score")
      .stop()
      .slideToggle(800);
  }
}

function syncScore() {
  // Post Score
  var scoreToSync = [];
  // console.log("SCORETOSYNC pre", scoreToSync);
  var line = $("tbody>tr");
  line.each(function() {
    var user = $(this)
      .find("td:nth-child(1)")
      .text();
    // console.log("USER", user);
    var words = $(this)
      .find("td:nth-child(2)")
      .text();
    // console.log("WORDS", words);
    var moreScore = { usuario: user, pontos: words };
    scoreToSync.push(moreScore);
  });
  // console.log("SCORETOSYNC pos ", scoreToSync);
  var datum = { placar: scoreToSync };
  $.post("http://localhost:3000/placar", datum, function() {
    // console.log(datum, " saved to server");
    $(".tooltip").tooltipster("open");
  })
    .fail(function() {
      $(".tooltip")
        .tooltipster("open")
        .tooltipster("content", "Houve uma falha na sincronia");
    })
    .always(function() {
      setTimeout(function() {
        $(".tooltip").tooltipster("close");
      }, 1200);
    });
}

function updateScore() {
  $.get("http://localhost:3000/placar", function(data) {
    console.log("Activated con with server for Update");
    // console.log(data);
    $(data).each(function() {
      var newScoreLine = newLine(this.usuario, this.pontos);
      newScoreLine.find(".removeScoreButton").click(removeScore);
      $("tbody").append(newScoreLine);
    });
  });
}
