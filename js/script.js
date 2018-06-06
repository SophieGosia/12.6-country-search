const url = 'https://restcountries.eu/rest/v2/name/';
const $countriesList = $('#countries');

$('#search').click(function() {
  searchCountries();
  scroll();
});

$('html, body').keydown(function(event) {
  if (event.which == 13) {
    event.preventDefault();
    searchCountries();
    scroll();
  }
});

function scroll() {
  $('html, body').animate({
    scrollTop: $('#countries').offset().top
  }, 500);
}

function searchCountries() {
  let countryName = $('#country-name')
    .val();
  if (!countryName.length) {
    countryName = 'Poland';
  }
  $.ajax({
    url: url + countryName,
    method: 'GET',
    success: showCountriesList,
    error: showErrorMessage,
  });
}

function showErrorMessage() {
  $countriesList.empty();
  $countriesList.append('<li>Are you sure this is a country name?</li>');
}

function showCountriesList(resp) {
  let $wrapper = $('<div>');
  $countriesList.empty();

  resp.forEach(function(item) {
    $('<img class="flag">').attr('src', item.flag).appendTo($wrapper);
    $('<h3>').text(`${item.name} (${item.alpha2Code})`).appendTo($wrapper);
    $('<p>').text(`Country native name: ${item.nativeName}`).appendTo($wrapper);
    $('<p>').text(`Capital city: ${item.capital}`).appendTo($wrapper);
    $('<p>').text(`Subregion: ${item.region}`).appendTo($wrapper);
    $('<p>').text(`Population: ${item.population}`).appendTo($wrapper);
    $('<p>').text(`Area (in sqare km): ${item.area}`).appendTo($wrapper);
    $wrapper.appendTo($countriesList);
  });
}
