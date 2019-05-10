const API = "https://api.icndb.com/jokes/random";

$(".button").on("click", getJoke);

//function responsible for matching words from joke
function getJokeWordList(joke) {
  return joke.match(/[a-z]+/gi);
}

//function responsible for rendering joke
function renderJoke(joke) {
  const $jokesArea = $(".jokesArea");
  const $joke = $("<h3 />", { text: joke });
  const $jokeWordList = $("<ul />");
  const words = getJokeWordList(joke)
    .sort((a, b) => a.length - b.length)
    .map(word => `<li>${word}</li>`)
  
  $jokesArea.append($joke, $jokeWordList.html(words));
}

//functions responsible for showing and hiding errors
function showError(error) {
  $(".error").text(error).show();
}

function hideError(error) {
  $(".error").text('').hide();
}


//function responsible for getting joke from API
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
