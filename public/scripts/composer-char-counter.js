$(document).ready(function () {
  $('#tweet-text').on('input', function() {
    // starting number of chars
    let remainingChar = 140;

    // length of the text in textarea
    let textLength = $(this).val().length;
    remainingChar -= textLength;

    // updates the new value of remainingChar
    let updatedChar = $('output').val(remainingChar);

    if (remainingChar < 0) {
      updatedChar.css('color', 'red');
      return;
    } else {
      updatedChar.css('color', '#545149');
    }
    
  });
});