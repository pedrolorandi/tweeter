/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
        <span class="date">${tweet.created_at}</span>
        <a href="#"><i class="fa-solid fa-flag" alt="Flag"></i></a>
        <a href="#"><i class="fa-sharp fa-solid fa-repeat" alt="Repeat"></i></a>
        <a href="#"><i class="fa-solid fa-heart" alt="Like"></i></a>
      </footer>
    </article>
    `;
  }

  // Render tweets with fake data
  renderTweets(data);

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