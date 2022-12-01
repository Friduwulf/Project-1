//////////////////////////
///Wiki API Integration///
//////////////////////////

var endpoint = 'https://en.wikipedia.org/w/api.php';

var parameters = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1,
};

var submitButton = document.querySelector('#search');
var input = document.querySelector('#searchText');
var errorSpan = document.querySelector('#error');
var wikiTextBox = document.querySelector('#wikiText');
var wikiTitleBox = document.querySelector('.wikiTitle');

const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};

const clearPreviousResults = () => {
    wikiTextBox.innerHTML = '';
    errorSpan.innerHTML = '';
};

const isInputEmpty = input => {
    if (!input || input === '') return true;
    return false;
};

const showError = (error) => {
    alert(error);
};

const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
        searchArticle();
    }
};

const wikiResult = results => {
    console.log(results);
    wikiTextBox.textContent = results[0].extract;
    wikiTitleBox.textContent = results[0].articleTitle;
}


const getExtract = pages => {
    var results = Object.values(pages).map(page => ({
        extract: page.extract,
        articleTitle: page.title,
    }));

    wikiResult(results);
};

const searchArticle = async () => {
    var searchValue = input.value;
    if (isInputEmpty(searchValue)) return;
    parameters.gsrsearch = searchValue;
    disableUi();
    try {
        const { data } = await axios.get(endpoint,{ params:parameters });
        if (data.error) throw new Error(data.error.info);
        getExtract(data.query.pages);
        enableUi();
    } catch (error) {
        showError(error);
        enableUi();
    }
};

const searchEventHandler = () => {
    input.addEventListener('keydown', enterKeyPress);
    submitButton.addEventListener('click', searchArticle);
};

searchEventHandler();

////////////////////////
///HTML functionality///
////////////////////////



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
