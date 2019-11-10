$(function () {
    console.log('App Loaded Successfully');
    getUserName();
});

// Get the searched for username
function getUserName() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let user = $('.js-input').val();
        requestUser(user);
        $('.results').empty();
    })
}
// Put username into a get request for GitHub
function requestUser(user) {
    let url = `https://api.github.com/users/${user}`
    const options = { method: 'GET' };
    fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (responseJson) {
            getUserRepos(responseJson);
        })
        .catch(function (err) {
            $('.error').show(300);
            $('.errorText').text(`There was an error: ${err.message}`);
            $('.error').delay(3000).hide(300);
            $('.js-input').val("");
        })
}
// Get user repos
function getUserRepos(responseJson) {
    let repo = responseJson.repos_url;
    const options = { method: 'GET' };
    fetch(repo, options)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (responseJson) {
            displayRepos(responseJson);
        })
        .catch(function (err) {
            $('.error').show(300);
            $('.errorText').text(`There was an error ${err.message}`);
            $('.error').delay(3000).hide(300);
        })

}
// Display user repos
function displayRepos(responseJson) {
    let nameArr = [];
    let linkArr = [];
    responseJson.forEach(function (ele) {
        nameArr.push([ele.name, ele.html_url]);
        $('.results').append(`<li>
                    <a href="${ele.html_url}" target="_blank">${ele.name}</a>
                </li>`);
    });
    clearInput();
}

function clearInput() {
    $('.js-input').val("");
}



