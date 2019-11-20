function borderColor() {
  field.on("input", function() {
    var phraseToWrite = $("#phraseToCopy").text();
    var typedText = field.val();
    // Note to self: the Pretty extension is adding extra spaces to the start of
    // the string, making the comparison fail if you don't strip it.
    var comparePhrase = phraseToWrite.trim().substr(0, typedText.length);
    //// comparison
    if (typedText == comparePhrase) {
      // console.log("Comparing-Green-> ", typedText, " to [", comparePhrase, "]");
      field.addClass("greenBorder");
      field.removeClass("redBorder");
    } else {
      // console.log("Comparing-Red -> ", typedText, " to [", comparePhrase, "]");
      field.addClass("redBorder");
      field.removeClass("greenBorder");
    }
  });
}
