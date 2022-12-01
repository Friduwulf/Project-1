var endpoint = 'https://https://en.wikipedia.org/w/api.php';

var parameters = {
    origin:'*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintor: true,
    exsectionformat: 'plain',
    generator: 'search',
}

var submitButton = document.querySelector('#submit');
var input = document.querySelector('#input');
var errorSpan = document.querySelector('#error');
var resultsContainer = document.querySelector('#results')

var instance = M.Carousel.init({
  fullWidth: true,
});

// Gabes youtube API key: AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U

// An example fetch for dogs using the youtube data api
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=dogs&key=AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U`)
.then(function(response) {
  return response.json()
})
.then(function(data) {
  console.log(data)
})
