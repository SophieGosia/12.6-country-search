const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = $('#countries');

$('#search').click(function() {

  searchCountries();

  $('html, body').animate({
    scrollTop: $('#countries').offset().top
  }, 500);
});

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
  countriesList.empty();
  countriesList.append('<li>Are you sure this is a country name?</li>');
}

function showCountriesList(resp) {
  countriesList.empty();
  resp.forEach(function(item) {
    $('<img class="flag">').attr('src', item.flag).appendTo(countriesList);
    $('<h3>').text(`${item.name} (${item.alpha2Code})`).appendTo(countriesList);
    $('<p>').text(`Country native name: ${item.nativeName}`).appendTo(countriesList);
    $('<p>').text(`Capital city: ${item.capital}`).appendTo(countriesList);
    $('<p>').text(`Subregion: ${item.region}`).appendTo(countriesList);
    $('<p>').text(`Population: ${item.population}`).appendTo(countriesList);
    $('<p>').text(`Area (in sqare km): ${item.area}`).appendTo(countriesList);
  });
}
