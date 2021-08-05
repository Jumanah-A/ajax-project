/* exported watchData */
/* global watchData */
function handleSubmit(event) {
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(' ').join('+'));

  // document.getElementById('movie-display').appendChild(movieInfo('movie'));
  document.getElementById('movie-display').removeChild(document.getElementById('movie-display').firstChild);
  switchViews('movie-view');
  document.querySelector('form').reset();
}
function getMovieData(name) {
  var currentItem = {};
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    currentItem.Title = xhr.response.Title;
    currentItem.Year = xhr.response.Year;
    currentItem.Genre = xhr.response.Genre;
    currentItem.imdbRating = xhr.response.imdbRating;
    currentItem.Plot = xhr.response.Plot;
    currentItem.Poster = xhr.response.Poster;
    document.getElementById('movie-display').appendChild(movieInfo('movie', currentItem));
    document.querySelector('.rate').addEventListener('click', function (event) { handleClick(event, currentItem); });
    document.querySelector('.add-watchlist').addEventListener('click', function (event) { handleClick(event, currentItem); });
  });
  xhr.send();
}

function movieInfo(view, currentItem) {
  // img element for the poster
  var posterImg = document.createElement('img');
  posterImg.className = 'poster';
  posterImg.setAttribute('src', currentItem.Poster);

  // title
  var headingTitle = document.createElement('h4');
  headingTitle.textContent = 'Title:';
  var paragraphTitle = document.createElement('p');
  paragraphTitle.className = 'movie-title';
  paragraphTitle.textContent = currentItem.Title;

  // year
  var headingYear = document.createElement('h4');
  headingYear.textContent = 'Year:';
  var paragraphYear = document.createElement('p');
  paragraphYear.className = 'year';
  paragraphYear.textContent = currentItem.Year.split('–').join(' – ');

  // genre
  var headingGenre = document.createElement('h4');
  headingGenre.textContent = 'Genre:';
  var paragraphGenre = document.createElement('p');
  paragraphGenre.className = 'genre';
  paragraphGenre.textContent = currentItem.Genre;

  // imdbRating
  var headingImdb = document.createElement('h4');
  headingImdb.textContent = 'IMDb Rating:';
  var paragraphImdb = document.createElement('p');
  paragraphImdb.className = 'imdb-rating';
  paragraphImdb.textContent = currentItem.imdbRating;

  // plot
  var headingPlot = document.createElement('h4');
  headingPlot.textContent = 'Plot:';
  var paragraphPlot = document.createElement('p');
  paragraphPlot.className = 'plot';
  paragraphPlot.textContent = currentItem.Plot;

  if (view === 'movie') {
    var rowPoster = document.createElement('div');
    rowPoster.className = 'row justify-center align-center movie-page';
    rowPoster.appendChild(posterImg);

    var row = document.createElement('div');
    row.className = 'row align-center flex-column movie-data';

    var threeFourColumn = document.createElement('div');
    threeFourColumn.className = 'column-three-four padding-075';

    threeFourColumn.appendChild(headingTitle);
    threeFourColumn.appendChild(paragraphTitle);
    row.appendChild(threeFourColumn);

    var threeFourYear = document.createElement('div');
    threeFourYear.className = 'column-three-four padding-075';

    threeFourYear.appendChild(headingYear);
    threeFourYear.appendChild(paragraphYear);
    row.appendChild(threeFourYear);

    var threeFourGenre = document.createElement('div');
    threeFourGenre.className = 'column-three-four padding-075';

    threeFourGenre.appendChild(headingGenre);
    threeFourGenre.appendChild(paragraphGenre);
    row.appendChild(threeFourGenre);

    var threeFourImdb = document.createElement('div');
    threeFourImdb.className = 'column-three-four padding-075';

    threeFourImdb.appendChild(headingImdb);
    threeFourImdb.appendChild(paragraphImdb);
    row.appendChild(threeFourImdb);

    var threeFourPlot = document.createElement('div');
    threeFourPlot.className = 'column-three-four padding-075';

    threeFourPlot.appendChild(headingPlot);
    threeFourPlot.appendChild(paragraphPlot);
    row.appendChild(threeFourPlot);

    var info = document.createElement('div');
    info.className = 'movie-info one-padding justify-center';
    info.appendChild(row);

    var addWatchlistRow = document.createElement('div');
    addWatchlistRow.className = 'row one-padding justify-even';
    var addWatchlistColumn = document.createElement('div');
    var addWatchlistButton = document.createElement('button');
    addWatchlistButton.className = 'add-watchlist red-button';
    addWatchlistButton.setAttribute('type', 'button');
    var plusIcon = document.createElement('i');
    plusIcon.className = 'fas fa-plus';
    addWatchlistButton.appendChild(plusIcon);
    addWatchlistButton.append(' Add to watchlist');
    addWatchlistColumn.appendChild(addWatchlistButton);
    addWatchlistRow.appendChild(addWatchlistColumn);

    var rateColumn = document.createElement('div');
    var rateButton = document.createElement('button');
    rateButton.className = 'rate red-button';
    rateButton.setAttribute('type', 'button');
    var thumbsUp = document.createElement('i');
    thumbsUp.className = 'fas fa-thumbs-up';
    rateButton.appendChild(thumbsUp);
    rateButton.append(' Rate');
    rateColumn.appendChild(rateButton);
    addWatchlistRow.appendChild(rateColumn);

    var block = document.createElement('div');
    block.className = 'entry';
    block.appendChild(rowPoster);
    block.appendChild(info);
    block.appendChild(addWatchlistRow);
    // console.log(block);
    return block;

  } else if (view === 'watchlist') {
    var rowPosterWatchlist = document.createElement('div');
    rowPosterWatchlist.className = 'justify-center align-center';
    rowPosterWatchlist.appendChild(posterImg);

    var columnFour = document.createElement('div');
    columnFour.className = 'column-four';
    columnFour.appendChild(rowPosterWatchlist);

    var rowWatch = document.createElement('div');
    rowWatch.className = 'row flex-column movie-data one-padding';

    var fullColumn = document.createElement('div');
    fullColumn.className = 'column-full';

    fullColumn.appendChild(headingTitle);
    fullColumn.appendChild(paragraphTitle);
    rowWatch.appendChild(fullColumn);

    var fullColumnYear = document.createElement('div');
    fullColumnYear.className = 'column-full';

    fullColumnYear.appendChild(headingYear);
    fullColumnYear.appendChild(paragraphYear);
    rowWatch.appendChild(fullColumnYear);

    var fullColumnGenre = document.createElement('div');
    fullColumnGenre.className = 'column-full';

    fullColumnGenre.appendChild(headingGenre);
    fullColumnGenre.appendChild(paragraphGenre);
    rowWatch.appendChild(fullColumnGenre);

    var fullColumnImdb = document.createElement('div');
    fullColumnImdb.className = 'column-full';

    fullColumnImdb.appendChild(headingImdb);
    fullColumnImdb.appendChild(paragraphImdb);
    rowWatch.appendChild(fullColumnImdb);

    var fullColumnPlot = document.createElement('div');
    fullColumnPlot.className = 'column-full';

    fullColumnPlot.appendChild(headingPlot);
    fullColumnPlot.appendChild(paragraphPlot);
    rowWatch.appendChild(fullColumnPlot);

    var infoWatch = document.createElement('div');
    infoWatch.className = 'column-three-four top-margin padding-075';
    infoWatch.appendChild(rowWatch);
    var watchlistentry = document.createElement('div');
    watchlistentry.className = 'watchlistentry';

    var rowBottom = document.createElement('div');
    rowBottom.className = 'row bottom-padding';
    rowBottom.appendChild(columnFour);
    rowBottom.appendChild(infoWatch);
    watchlistentry.appendChild(rowBottom);
    // console.log(watchlistentry);
    return watchlistentry;
  }

}

function handleClick(event, entry) {
  // console.log(event.target.className);
  if (event.target.className === 'mywatchlist-img') {
    showWatchlist();
    if (watchData.watchListArray.length === 0) {
      document.querySelector('.no-items').className = 'row no-items justify-center';
    } else {
      document.querySelector('.no-items').className = 'row no-items justify-center hidden';
    }
    switchViews('mywatchlist-view');
  } else if (event.target.className === 'search-icon-header fas fa-search fa-3x') {
    switchViews('search-view');
  } else if (event.target.className === 'add-watchlist red-button') {
    addToWatchlist(entry);
  } else if (event.target.className === 'rate red-button') {
    // console.log("rate button is pressed");
    document.querySelector('.movie-data').appendChild(showRating());
  }
}

function showRating() {
  var ratingRow = document.createElement('div');
  ratingRow.className = 'column-three-four padding-075 rating flex';
  var chooseRating = document.createElement('div');
  chooseRating.className = 'choose-rating';
  var ratingHeading = document.createElement('h4');
  ratingHeading.textContent = 'Choose your rating: ';
  chooseRating.appendChild(ratingHeading);
  var stars = document.createElement('div');
  stars.className = 'stars flex align-center';
  var firstStarIcon = document.createElement('i');
  firstStarIcon.className = 'far fa-star fa-2x star';
  firstStarIcon.setAttribute('id', 'first-star');
  var secondStarIcon = document.createElement('i');
  secondStarIcon.className = 'far fa-star fa-2x star';
  secondStarIcon.setAttribute('id', 'second-star');
  var thirdStarIcon = document.createElement('i');
  thirdStarIcon.className = 'far fa-star fa-2x star';
  thirdStarIcon.setAttribute('id', 'third-star');
  var fourthStarIcon = document.createElement('i');
  fourthStarIcon.className = 'far fa-star fa-2x star';
  fourthStarIcon.setAttribute('id', 'fourth-star');
  var fifthStarIcon = document.createElement('i');
  fifthStarIcon.className = 'far fa-star fa-2x star';
  fifthStarIcon.setAttribute('id', 'fifth-star');
  stars.appendChild(firstStarIcon);
  stars.appendChild(secondStarIcon);
  stars.appendChild(thirdStarIcon);
  stars.appendChild(fourthStarIcon);
  stars.appendChild(fifthStarIcon);
  ratingRow.appendChild(chooseRating);
  ratingRow.appendChild(stars);
  return ratingRow;
}

function showWatchlist() {
  document.getElementById('mywatchlist-list').innerHTML = '';
  for (var i = 0; i < watchData.watchListArray.length; i++) {
    document.getElementById('mywatchlist-list').appendChild(movieInfo('watchlist', watchData.watchListArray[i]));
  }
}

function addToWatchlist(entry) {
  if (watchData.watchListArray.length === 0) {
    watchData.watchListArray.push(entry);
  } else {
    var len = watchData.watchListArray.length;
    for (var i = 0; i < len; i++) {
      if (String(watchData.watchListArray[i].Title) === String(entry.Title)) {

        return;
      }
    }
    watchData.watchListArray.push(entry);
  }
}

function switchViews(view) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if (view !== $viewList[i].getAttribute('data-view')) {
      $viewList[i].className = 'view hidden';
    } else {
      $viewList[i].className = 'view';
    }
  }
  if (view === 'search-view') {
    document.querySelector('.header').className = 'header hidden';
    document.querySelector('body').className = 'background-image';
  } else {
    document.querySelector('body').className = 'background-color';
    document.querySelector('.header').className = 'header one-padding';
  }
}

// Listen for the serach icon and the mywatchlist button in the header
document.querySelector('form').addEventListener('submit', handleSubmit);
document.querySelector('.mywatchlist-button').addEventListener('click', handleClick);
document.querySelector('.search-button').addEventListener('click', handleClick);
