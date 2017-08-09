// function main() {
var map = L.map('map', {
    center: L.latLng(7.260, 29.7070),
    zoom: 7
});


var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
});


var controlLayers = L.control.layers().addTo(map);

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

var disputedAreasStyle = {
			fillColor: "#ff0000",
			weight: 2,
			opacity: 0.4,
			color: 'red',
			fillOpacity: 0.3
		};

var citiesStyle = {
    radius: 5,
    fillColor: "#000",
    color: "#000",
    weight: 1,
    opacity: 100,
    fillOpacity: 100
};

var conflictPointsStyle = {
    radius: 5,
    fillColor: "#006400",
    color: "#000",
    weight: 1,
    opacity: 100,
    fillOpacity: 100
};

function foodSecurityColor(d) {
    return d == 5  ? '#5C1010' :
           d == 4  ? '#FF0000' :
           d == 3  ? '#FF8000' :
           d == 2  ? '#FFFF33' :
           d == 1  ? '#E5FFCC' :
                     '#FFEDA0';
}

function foodSecurityStyle(feature) {
    return {
        fillColor: foodSecurityColor(feature.properties.ML2),
        weight: 2,
        opacity: 1,
        color: 'white',
        // dashArray: '3',
        fillOpacity: 0.7
    };
}



function humanitarianAssistanceColor(h) {
    return h == 1.0  ? '#5C1010' :
                     '#FFEDA0';
}
function humanitarianAssistanceStyle(feature) {
    return {
        fillColor: humanitarianAssistanceColor(feature.properties.HA2),
        weight: 2,
        opacity: 1,
        color: 'white',
        // dashArray: '3',
        fillOpacity: 0.7
    };
}


function livelihoodZonesColor(z) {
    return z == 'Highland forest and sorghum'  ? '#A63A50' :
           z == 'Western groundnuts, sesame and sorghum'  ? '#ABC4AB' :
           z == 'Eastern semi-arid pastoral'  ? '#63535B' :
           z == 'Eastern plains sorghum and cattle'  ? '#A39171' :
           z == 'Greater Bahr el Ghazal sorghum and cattle'  ? '#27474E' :
           z == 'Nile basin fishing and agro-pastoral'  ? '#2978A0' :
           z == 'Oil resources, maize and cattle'  ? '#F2CD5D' :
           z == 'Northeastern maize and cattle'  ? '#FC9E4F' :
           z == 'Northern sorhgum and livestock'  ? '#C2AFF0' :
                        '#FFEDA0';
}

function livelihoodZonesStyle(feature) {
    return {
        fillColor: livelihoodZonesColor(feature.properties.LZNAMEEN),
        weight: 2,
        opacity: 1,
        color: 'white',
        // dashArray: '3',
        fillOpacity: 0.7
    };
}

function getPopulationColor(Mid_2017_P) {
    return Mid_2017_P < 66226    ? '#E3F2FD' :
           Mid_2017_P < 107643   ? '#90CAF9' :
           Mid_2017_P < 155562   ? '#42A5F5' :
           Mid_2017_P < 219575  ? '#1E88E5' :
           Mid_2017_P < 359855  ? '#1565C0' :
           Mid_2017_P < 558273 ? '#0D47A1' :
							'#8B0000';
}

function populationStyle(feature) {
    return {
        fillColor: getPopulationColor(feature.properties.Mid_2017_P),
        weight: 1.5,
        opacity: 80,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.7
    };
}
// var stripes = new L.StripePattern({ fillPattern: stripes, fillOpacity: 1.0});


//call in country boundary layers, do this first so the other layers are placed on top
$.ajax("data/admin0.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           var admin0 = L.geoJson(response, {style: admin1Style}).addTo(map);
           controlLayers.addOverlay(admin0, 'South Sudan Boundary');

        }
    });

$.ajax("data/admin1.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           var admin1 = L.geoJson(response, {style: admin1Style}).addTo(map);
           controlLayers.addOverlay(admin1, 'States Boundary');

        }
    });

$.ajax("data/admin2.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var admin2 = L.geoJson(response, {style: admin2Style}).addTo(map);
            controlLayers.addOverlay(admin2, 'County Boundary');

        }
    });

// function onEachFeatureCities(feature, layer) {
//
// 	//no property named popupContent; instead, create html string with all properties
// 	var popupContent = (feature.properties.NAME)
//
// 		layer.bindLabel(popupContent)
//   };

$.ajax("data/cities.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var cities = L.geoJson(response, {
                  pointToLayer: function (feature, latlng) {
                      label = String(feature.properties.NAME)
                      return new L.CircleMarker(latlng, citiesStyle).bindTooltip(label, { permanent: true }).openTooltip();
                      }
                    }).addTo(map);
            controlLayers.addOverlay(cities, 'Major Cities');

        }
    });

function onEachFeatureConflictPoints(feature, layer) {

	//no property named popupContent; instead, create html string with all properties
	var popupContent = ('<b>Event Type: </b>' + feature.properties.EVENT_TYPE + '<br><b>Source: </b>'+ feature.properties.SOURCE + '<br><b>Fatalities: </b>'+feature.properties.FATALITIES)
  '<b>State: </b>' +feature.properties.ADMIN2 + '<br><b>Population: </b>' + feature.properties.Mid_2017_P

		layer.bindPopup(popupContent);

};

var markers = L.markerClusterGroup();

$.ajax("data/conflictpoints.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map

            var conflictPoints = L.geoJson(response, {
                onEachFeature: onEachFeatureConflictPoints,
                  pointToLayer: function (feature, latlng) {
                      return L.circleMarker(latlng, conflictPointsStyle);
                      }

                });
            markers.addLayer(conflictPoints);

            // map.addLayer(markers);
            // map.fitBounds(markers.getBounds());

            controlLayers.addOverlay(markers, 'Conflict Points');

        }
    });

$.ajax("data/disputedareas.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var disputedAreas = L.geoJson(response, {style: disputedAreasStyle});
            controlLayers.addOverlay(disputedAreas, 'Disputed Areas');

        }
    });

function onEachFeaturePopulation(feature, layer) {

	//no property named popupContent; instead, create html string with all properties
	var popupContent = ('<b>State: </b>' +feature.properties.ADMIN2 + '<br><b>Population: </b>' + feature.properties.Mid_2017_P)

		layer.bindPopup(popupContent);

};

$.ajax("data/population.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var population = L.geoJson(response, {
              onEachFeature: onEachFeaturePopulation,
              style: populationStyle});
            controlLayers.addOverlay(population, 'Population');

        }
    });

$.ajax("data/humanitarianAssistance2.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var humanitarianAssistance = L.geoJson(response, {style: humanitarianAssistanceStyle});
            controlLayers.addOverlay(humanitarianAssistance, 'Humanitarian Assistance');

        }
    });

function onEachFeatureFoodSecurity(feature, layer) {

	//no property named popupContent; instead, create html string with all properties
	var popupContent = ('<b>Food Security Status: </b>' + feature.properties.ML2)

		layer.bindPopup(popupContent);

};
$.ajax("data/foodSecurity.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            var foodSecurity = L.geoJson(response, {
              onEachFeature: onEachFeatureFoodSecurity,
              style: foodSecurityStyle});
              controlLayers.addOverlay(foodSecurity, 'Food Security Status');

        }
    });

function onEachFeatureLivelihoodZones(feature, layer) {

	//no property named popupContent; instead, create html string with all properties
	var popupContent = ('<b>Livelihood Zone: </b>' + feature.properties.LZNAMEEN)

		layer.bindPopup(popupContent);

};

$.ajax("data/livelihoodzones.geojson", {
        dataType: "json",
        success: function(response, layer){
            //create a Leaflet GeoJSON layer and add it to the map
            var livelihoodZones = L.geoJson(response, {
              onEachFeature: onEachFeatureLivelihoodZones,
              style: livelihoodZonesStyle});
              controlLayers.addOverlay(livelihoodZones, 'Livelihood Zones');

        }
    });



var foodSecurityLegend = L.control({position: 'bottomleft'});
var livelihoodZonesLegend = L.control({position: 'bottomleft'});

foodSecurityLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="legend.png" alt="legend" width="134" height="147">';
return div;
};

livelihoodZonesLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="change_legend.png" alt="legend" width="235" height="215">';
return div;
};

// Add this one (only) for now, as the Population layer is on by default
// foodSecurityLegend.addTo(map);

map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Food Security Status') {
        this.removeControl(livelihoodZonesLegend);
        foodSecurityLegend.addTo(this);
    } else {
        this.removeControl(foodSecurityLegend);
        livelihoodZonesLegend.addTo(this);
    }
});

map.on('overlayremove', function (eventLayer) {
    // Switch to the Population legend...
    if (eventLayer.name === 'Food Security Status') {
        this.removeControl(foodSecurityLegend);
    } else { // Or switch to the Population Change legend...
        this.removeControl(livelihoodZonesLegend);
    }

});
