// function main() {
var map = L.map('map', {
    center: L.latLng(7.260, 29.7070),
    zoom: 7
});

var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

basemap.addTo(map);

var admin1Style = {
			fillColor: "#E3E3E3",
			weight: 5,
			opacity: 0.4,
			color: 'gray',
			fillOpacity: 0.3
		};

var admin2Style = {
			fillColor: "#E3E3E3",
			weight: 2,
			opacity: 0.4,
			color: 'gray',
			fillOpacity: 0.3
		};
//call in country boundary layers, do this first so the other layers are placed on top
  $.ajax("data/admin1.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           L.geoJson(response, {style: admin1Style}).addTo(map);

        }
    });
   $.ajax("data/admin2.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {style: admin2Style}).addTo(map);

        }
    });
