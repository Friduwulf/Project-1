//////////////////////////
///Wiki API Integration///
//////////////////////////
var searchValue = null;
var endpoint = 'https://en.wikipedia.org/w/api.php';

var parameters = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1,
};

var storedSearches = [];

var submitButton = document.querySelector('#search');
var input = document.querySelector('#searchText');
var wikiTextBox = document.querySelector('#wikiText');
var wikiTitleBox = document.querySelector('.wikiTitle');
var wikiLink = document.querySelector('.wikiLink');
var previousSearchButton = document.querySelector('#last_search');

const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};

const isInputEmpty = input => {
    if (!input || input === '') return true;
    return false;
};

const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
        searchArticle();
        searchVideo();
    }
};

const wikiResult = results => {
    console.log(results);
    wikiTextBox.textContent = results[0].extract;
    wikiTitleBox.textContent = results[0].articleTitle;
    wikiLink.setAttribute("href", `https://en.wikipedia.org/?curid=${results[0].link}`);
};

const getExtract = pages => {
    var results = Object.values(pages).map(page => ({
        extract: page.extract,
        articleTitle: page.title,
        link: page.pageid,
    }));

    wikiResult(results);
};

const searchArticle = async () => {
    searchValue = input.value;
    if (isInputEmpty(searchValue)) return;
    parameters.gsrsearch = searchValue;
    disableUi();
    try {
        const { data } = await axios.get(endpoint,{ params:parameters });
        if (data.error) throw new Error(data.error.info);
        getExtract(data.query.pages);
        enableUi();
        storedSearches.push(searchValue);
        localStorage.setItem("previousSearch", JSON.stringify(storedSearches));
    } catch (error) {
        $('#modal1').modal('open');
        enableUi();
    }
};

// displayVideo is used to change the video element in the html
let displayVideo;
// saveCurrentData is used to hand over the fetched data over to changeVideo function, instead of fetching multiple times
let saveCurrentData;
const searchVideo = () => {
    currentVideo = 0;

    if (isInputEmpty(searchValue)) return;
    searchValue = input.value;

    disableUi();

    // Fetches video data based on searchValue
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchValue}&key=AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {

    // Pass the data from the fetch to saveCurrentData for later use
    saveCurrentData = data;  

    try {
        // Change to video element in the html to what the user just searched for
        displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${data.items[0].id.videoId}`);

        console.log(data)
        enableUi();
    } catch (error) {
      $('#modal1').modal('open');
      enableUi();
    }
    })
    // Clears the input value after submitting a search so the user doesn't have to delete anything to search something else
    input.value = '';
}

let currentVideo = 0;
const changeVideo = (event) => {

    // First check what button what pressed, next or prev. Then check to make sure if currentVideo's value is at the min or max index of saveCurrentData's list of returned videos from the fetch.
    if (event.target.textContent.includes("chevron_right") && currentVideo == 4) {

        // If currentVideo's index is at the END of saveCurrentData's list of videos, update the video element in the html but do NOT change currentVideo's value
        displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${saveCurrentData.items[currentVideo].id.videoId}`);
        return;

    } else if (event.target.textContent.includes("chevron_left") && currentVideo == 0) {

        // If currentVideo's index is at the START of saveCurrentData's list of videos, update the video element in the html but do NOT change currentVideo's value
        displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${saveCurrentData.items[currentVideo].id.videoId}`);
        return;

    } else {
        // If currentVideo's value is not already at the min or max index of saveCurrentData's list of videos, just check what button was pressed
        if (event.target.textContent.includes("chevron_right")) {

            // This time currentVideo's value will be INCREMENTED to move on to the NEXT index of videos in saveCurrentData
            currentVideo++;
            // Change the video element in html
            displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${saveCurrentData.items[currentVideo].id.videoId}`);

        } else {

            // This time currentVideo's value will be DECREMENTED to move on to the PREVIOUS index of videos in saveCurrentData
            currentVideo--;
            // Change the video element in html
            displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${saveCurrentData.items[currentVideo].id.videoId}`);

        }
    }
}

const searchLast = () => {
    let prevSearch = JSON.parse(localStorage.getItem('previousSearch'));
    input.value = prevSearch[prevSearch.length-2];
};

let nextVideo = $("#nextVideo").on("click", changeVideo);
let prevVideo = $("#prevVideo").on("click", changeVideo);

const searchEventHandler = () => {
    input.addEventListener('keydown', enterKeyPress);
    submitButton.addEventListener('click', searchArticle);
    submitButton.addEventListener('click', searchVideo);
    previousSearchButton.addEventListener('click', searchLast);
};

$(document).ready(function() {
    $('.modal').modal();
});

searchEventHandler();
// Devin's youtube API key: AIzaSyApu7PF3orxR1Krl_fgkehmLRmr5jhWPp0
// Gabes youtube API key: AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U