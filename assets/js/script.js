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

var submitButton = document.querySelector('#search');
var input = document.querySelector('#searchText');
var wikiTextBox = document.querySelector('#wikiText');
var wikiTitleBox = document.querySelector('.wikiTitle');
var wikiLink = document.querySelector('.wikiLink');

const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};

const clearPreviousResults = () => {
    wikiTextBox.textContent = '';
    wikiTitleBox.textContent = '';
    wikiLink.setAttribute("href", '#');
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
    clearPreviousResults();
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

const searchVideo = (currentvideovalue=1) => {
    console.log(`currentvideovalue is: ${currentvideovalue}`)
    searchValue = input.value;

    if (isInputEmpty(searchValue)) return;
    clearPreviousResults();
    disableUi();

    // Fetches video data based on searchValue
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=2&q=${searchValue}&key=AIzaSyApu7PF3orxR1Krl_fgkehmLRmr5jhWPp0`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    try {
        let displayVideo = $("#player").attr("src", `https://www.youtube.com/embed/${data.items[currentvideovalue].id.videoId}`);
        console.log(data)
    } catch (error) {
      alert(error)
    }
    })
}

let currentVideo = 0;
const changeVideo = (event) => {
    console.log(event.target.textContent)

    if (event.target.textContent.includes("chevron_right")) {
        currentVideo++;
        if (currentVideo == 2) {
            return null;
        } else {
            console.log(`currentVideo after plus: ${currentVideo}`)
            searchVideo(currentVideo);
        }
    }
    else {
        currentVideo--;
        if (currentVideo < 0) {
            return null;
        } else {
            console.log(`currentVideo after minus: ${currentVideo}`)
            searchVideo(currentVideo);
        } 
    }
}

let nextVideo = $("#nextVideo").on("click", changeVideo);
let prevVideo = $("#prevVideo").on("click", changeVideo);


// let elems = document.querySelectorAll('.carousel');
// let carouselInstances = M.Carousel.init(elems, {
//     fullWidth: true,
//     padding: 10
// });
// initializes the materialize carousel
// document.addEventListener('DOMContentLoaded', function() {
//     let elems = document.querySelectorAll('.carousel');
//     let carouselInstances = M.Carousel.init(elems, {
//         fullWidth: true,
//         padding: 10
//     });
// });

const searchEventHandler = () => {
    input.addEventListener('keydown', enterKeyPress);
    submitButton.addEventListener('click', searchArticle);
    submitButton.addEventListener('click', () => searchVideo(currentVideo));
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

// *NOTE FOR GABE* \\
// I already set the search text grab up, it's in line 74 and the variable is called searchValue. I believe you can reference it, 
// we can also work tonight to build your fetch into my event listener.

// Devin's youtube API key: AIzaSyApu7PF3orxR1Krl_fgkehmLRmr5jhWPp0
// Gabes youtube API key: AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U


