import { addPlace, getPlaces, subscribe } from './dataService.js';

let googleMap;

function renderMarkers(placesArray) {
  googleMap.markerList.forEach(m => m.setMap(null)); // remove all markers
  googleMap.markerList = [];

  placesArray.forEach((place) => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

function init() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 }, zoom: 3
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addMarker);
}

function addMarker(event) {
  addPlace(event.latLng);
}

init();
renderMarkers(getPlaces());
subscribe(renderMarkers);

