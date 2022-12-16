/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Function to prevent XSS
  const escape = function (string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

  // Load tweets from /tweets, and then render them
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets'
    }).
    then(res => {
      renderTweets(res);
    })
  }

  // Iterate over the tweets, create a tweet element for each tweet and append it to the container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }  
  }

  // Render the last tweet to append it dynamically
  const renderLastTweet = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets'
    }).
    then(res => {
      const $tweet = createTweetElement(res[res.length - 1]);
      $('#tweets-container').append($tweet);
    })
  }

  // Return an HTML string that represents a tweet with data
  const createTweetElement = function (tweet) {
    return `
    <article class="tweet">
      <header>
        <img src="${tweet.user.avatars}" alt="User picture">
        <span>${tweet.user.name}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <span class="date">${timeago.format(tweet.created_at)}</span>
        <a href="#"><i class="fa-solid fa-flag" alt="Flag"></i></a>
        <a href="#"><i class="fa-sharp fa-solid fa-repeat" alt="Repeat"></i></a>
        <a href="#"><i class="fa-solid fa-heart" alt="Like"></i></a>
      </footer>
    </article>
    `;
  };

  // Load the tweets from /tweets
  loadTweets();

  // Attach an event handler to the form's submit event, serialize the data and send it in a POST request
  $('form').submit(function (e) {
    e.preventDefault();
    const $textarea     = $(this).find('textarea');
    const textareaValue = $textarea.val();
    const $errorMessage = $('#error-message');

    // Check if the textarea value is empty or if it has more than 140 characters
    if (textareaValue === '') {
      if($errorMessage.is(':visible')) {
        $errorMessage.html('<i class="fa-solid fa-triangle-exclamation"></i>The tweet cannot be empty!');
      } else {
        $errorMessage.slideDown().html('<i class="fa-solid fa-triangle-exclamation"></i>The tweet cannot be empty!');
      }
    } else if (textareaValue.length > 140) {
      if($errorMessage.is(':visible')) {
        $errorMessage.html('<i class="fa-solid fa-triangle-exclamation"></i>The tweet cannot have more than 140 characters!');
      } else {
        $errorMessage.slideDown().html('<i class="fa-solid fa-triangle-exclamation"></i>The tweet cannot have more than 140 characters!');
      }
      // Else send a GET request to add the lastest tweet to index and clear the form
    } else {
      $errorMessage.slideUp();
      const $counter = $textarea.parent().find('.counter');
      const $data = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $data
      })
      .then(res => {
        renderLastTweet();
        $textarea.val('');
        $counter.text('140');
      })
    };
  });
});