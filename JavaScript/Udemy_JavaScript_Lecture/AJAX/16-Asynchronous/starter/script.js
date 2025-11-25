'use strict';
/*
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const renderCountry = function(data){
      const html = `
            <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>${ (+data.population / 1000000).toFixed(1)}</span></p>
              <p class="country__row"><span>${data.languages[0].name}</span>LANG</p>
              <p class="country__row"><span>${data.currencies[0].name}</span>CUR</p>
            </div>
          </article>
          `;
          countriesContainer.insertAdjacentHTML('beforeend', html)
          countriesContainer.style.opacity = 1;
}
const getCountryAndNeighbor = function (country){
  // AJAX call country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();


  request.addEventListener('load', function(){
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data)

    // get neighbor country (2)
    const [neighbor] = data.borders;

    if(!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/name/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function(){
      console.log(this.responseText);
    })



  })
}

getCountryAndNeighbor('portugal')
*/

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request);
