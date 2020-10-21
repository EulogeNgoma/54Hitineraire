var str = window.location.href;
var url = new URL(str);
var LATDEP = url.searchParams.get("dplat");
var LONGDEP = url.searchParams.get("dplong");
var LATARV = url.searchParams.get("arlat");
var LONGARV = url.searchParams.get("arlong");

function initMap() {
  /////
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 0.4170966, lng: 9.4550096 },
  });
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      origin: { lat: parseFloat(LATDEP), lng: parseFloat(LONGDEP) },
      destination: { lat: parseFloat(LATARV), lng: parseFloat(LONGARV) },
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
