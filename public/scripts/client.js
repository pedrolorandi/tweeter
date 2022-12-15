/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

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

  // Return an HTML string that represents a tweet with data
  const createTweetElement = function (tweet) {
    return `
    <article class="tweet">
      <header>
        <img src="${tweet.user.avatars}" alt="User picture">
        <span>${tweet.user.name}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span class="date">${timeago.format(tweet.created_at)}</span>
        <a href="#"><i class="fa-solid fa-flag" alt="Flag"></i></a>
        <a href="#"><i class="fa-sharp fa-solid fa-repeat" alt="Repeat"></i></a>
        <a href="#"><i class="fa-solid fa-heart" alt="Like"></i></a>
      </footer>
    </article>
    `;
  }  

  // Load the tweets from /tweets
  loadTweets();

  // Attach an event handler to the form's submit event, serialize the data and send it in a POST request
  $('form').submit(function (e) {
    e.preventDefault();

    const $data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $data
    })
  });
});