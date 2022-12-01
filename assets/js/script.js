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

