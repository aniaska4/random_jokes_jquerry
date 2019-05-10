const API = "https://api.icndb.com/jokes/random";

$(".js_getJoke").on("click", getJoke);

function getJokeWordList(joke) {
  return joke.match(/[a-z]+/gi);
}

function renderJoke(joke) {
  const $jokesArea = $(".jokesArea");
  const $joke = $("<h3 />", { text: joke });
  const $jokeWordList = $("<ul />");
  const words = getJokeWordList(joke)
    .sort((a, b) => a.length - b.length)
    .map(word => `<li>${word}</li>`)
  
  $jokesArea.append($joke, $jokeWordList.html(words));
}

function showError(error) {
  $(".error").text(error).show();
}

function hideError(error) {
  $(".error").text('').hide();
}

function getJoke() {
  hideError();
  
  $.get(API)
    .done(function(response) {
      const { joke } = response.value;
      renderJoke(joke);
    })
    .fail(function() {
      showError("We are sorry, but we can not display the content at the moment");
    });
}
