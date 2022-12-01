//////////////////////////
///Wiki API Integration///
//////////////////////////

var endpoint = 'https://https://en.wikipedia.org/w/api.php';

var parameters = {
    origin:'*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintor: true,
    exsectionformat: 'plain',
    generator: 'search',
    gsrlimit: 1,
}

var submitButton = document.querySelector('#search');
var input = document.querySelector('#searchText');
var errorSpan = document.querySelector('#error');
var resultsContainer = document.querySelector('#results');

var disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
}

var enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
}

var clearPreviousResults = () => {
    resultsContainer.innerHTML = '';
    errorSpan.innerHTML = '';
}

var isInputEmpty = () => {
    if (!input || input === '') return true;
    return false;
}

var showError = (error) => {
    errorSpan.innerHTML = `${error}`;
}



////////////////////////
///HTML functionality///
////////////////////////

var enterKeyPress = (e) => {
    if (e.key === 'Enter') {
        searchArticle();
    }
}

var searchArticle = () => {
    var searchValue = input.value;
    console.log(searchValue);
}

var searchEventHandler = () => {
    input.addEventListener('keydown', enterKeyPress);
    submitButton.addEventListener('click', searchArticle);
}

searchEventHandler();

var instance = M.Carousel.init({
  fullWidth: true,
});

/////////////////////////////
///YouTube API Integration///
/////////////////////////////

// Gabes youtube API key: AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U

// An example fetch for dogs using the youtube data api
// fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=dogs&key=AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U`)
// .then(function(response) {
//   return response.json()
// })
// .then(function(data) {
//   console.log(data)
// })
