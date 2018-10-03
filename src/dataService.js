let myPlaces = [];
const geocoder = new google.maps.Geocoder;

let changeListeners = [];

export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

/* ... */

function publish(data) {
  changeListeners.forEach((changeListener) => { changeListener(data); });
}

export function addPlace(latLng) {
  geocoder.geocode({ 'location': latLng }, function (results) {
    try {
      const cityName = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;

      myPlaces.push({ position: latLng, name: cityName });

      publish(myPlaces);

      localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    } catch (e) {
      console.log('No city found in this location! :(');
    }
  });
}

/* ... */





function initLocalStorage() {
  const placesFromLocalstorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalstorage)) {
    myPlaces = placesFromLocalstorage;
    publish();
  }
}

export function getPlaces() {
  return myPlaces;
}

initLocalStorage();
