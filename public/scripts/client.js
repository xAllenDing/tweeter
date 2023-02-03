/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  
  // reads the data from the server and update tweets without page reload
  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
      }
    });
  };
  
  // calls loadTweets function and loads the initial tweets in the history
  loadTweets();

  // hides error messages until errors do occur
  $('.error-empty').hide();
  $('.error-long').hide();

  // posts tweets without having the page to refresh and displays error messages
  // if the tweet is too long or is empty
  const $tweetPost = $('form.new-tweet');
  const $textarea = $('textarea');
  $tweetPost.on('submit', function (event) {
    event.preventDefault();
    if ($textarea.val().length === 0) {
      $('.error-empty').slideDown(600).delay(1500).slideUp(600);
      return;
    } else if ($textarea.val().length > 140) {
      $('.error-long').slideDown(600).delay(1500).slideUp(600);
      return;
    }
    const serializedTweet = $(this).serialize();
    $.post('/tweets/', serializedTweet)
    .then((response) => {
      loadTweets();
      $('textarea').val('');
      $('.output').val(140);
    });
  });


  // ensures that posts won't manipulate data and that it will be posted as a
  // text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // gathers all the information for the new tweet
  const createTweetElement = function (tweet) {
    const $markup = `
    <article>
    <header class="tweet-header">
      <div class="name">
        <img src="${escape(tweet.user["avatars"])}">
        <h4>${escape(tweet.user["name"])}</h4>
      </div>
      <h4 class="handle-name">${escape(tweet.user["handle"])}</h4>
    </header>
    <p>${escape(tweet.content["text"])}</p>
    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="icon"> 
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
      </div>
    </footer>
  </article>`
    return $markup;
  }

  // loops through an array of tweets and then gets passed into 
  // createTweetElement and then it gets posted onto the webpage
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet)
    }
  }
});



