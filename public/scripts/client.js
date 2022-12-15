/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function (tweets) {
    let $tweet = `
    <article class="tweet">
      <header>
        <img src="${tweets.user.avatars}" alt="User picture">
        <span>${tweets.user.name}</span>
      </header>
      <p>${tweets.content.text}</p>
      <footer>
        <span class="date">${tweets.created_at}</span>
        <a href="#"><i class="fa-solid fa-flag" alt="Flag"></i></a>
        <a href="#"><i class="fa-sharp fa-solid fa-repeat" alt="Repeat"></i></a>
        <a href="#"><i class="fa-solid fa-heart" alt="Like"></i></a>
      </footer>
    </article>
    `
    return $tweet;
  }

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);

  $('#')
});