$(document).ready(function () {
  const $textarea = $('#tweet-text');
  const $counter = $textarea.parent().find('.counter');

  $textarea.on('input', function() {
    const charLength = 140 - $textarea.val().length;

    $counter.text(charLength);
    $counter.toggleClass('negative', charLength < 0);
  });
});