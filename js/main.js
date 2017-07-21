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
var admin0 = $.ajax("data/admin0.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           L.geoJson(response, {style: admin1Style}).addTo(map);

        }
    });

var admin1 = $.ajax("data/admin1.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           L.geoJson(response, {style: admin1Style}).addTo(map);

        }
    });
var admin2 = $.ajax("data/admin2.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {style: admin2Style}).addTo(map);

        }
    });

var disputedAreas = $.ajax("data/disputedareas.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);

        }
    });

var humanitarianAssistance = $.ajax("data/humanitarianAssistance.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);

        }
    });

var foodSecurity = $.ajax("data/foodSecurity.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);

        }
    });

var livelihoodZones = $.ajax("data/livelihoodzones.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);

        }
    });
var layerToggle = {'South Sudan Boundary': admin0, 'States': admin1, 'Counties': admin2, 'Disputed Areas': disputedAreas, 'Humanitarian Assistance': humanitarianAssistance, 'Food Security': foodSecurity, 'Livelihood Zones': livelihoodZones};


//This adds the layer control to your map.
L.control.layers(layerToggle).addTo(map);
