

import { getPlaces, subscribe } from './dataService.js';

function renderCities(placesArray) {
  // Get the element for rendering the city list...
  const cityListElement = document.getElementById('citiesList');

  // ...clear it...
  cityListElement.innerHTML = '';

  // ...and populate it, one place at a time using forEach function
  placesArray.forEach((place) => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    cityListElement.appendChild(cityElement);
  });
}

renderCities(getPlaces());

subscribe(renderCities);




