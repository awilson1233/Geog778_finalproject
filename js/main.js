// function main() {
var map = L.map('map', {
    center: L.latLng(39.09461, -120.08),
    zoom: 11
});

var basemap = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

basemap.addTo(map);

var cartoCSSPeaks = "#layer { "+
    //"marker-width: ramp([elevation], range(2, 8)," +
    //"quantiles(5));" +
    "marker-width: 8;" +
    "marker-fill: #594316;" +
    "marker-fill-opacity: 0.9;" +
    "marker-allow-overlap: true;" +
    "marker-line-width: 1;" +
    "marker-line-color: #FFF;" +
    "marker-line-opacity: 1;" +

  "}"

var peaksAreOn = false;

//add data to map
var peaks = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM peaks',
    cartocss: cartoCSSPeaks,

}]
}, { https: true })

.addTo(map)
  .done(function(layer) {
            // add infowindow
            cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['name', 'elevation'])
          });




var cartoCSSRecreationActivity = "#layer {" +
  "marker-width: 8;" +
  "marker-fill: #FFB927;" +
  "marker-fill-opacity: 0.9;" +
  "marker-allow-overlap: true;" +
  "marker-line-width: 1;" +
  "marker-line-color: #FFF;" +
  "marker-line-opacity: 1;" +
"}"

//add data to map
var recreationActivity = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM recreationactivities',
    cartocss: cartoCSSRecreationActivity,

}]
}, { https: true })

.addTo(map)
  .done(function(layer) {
            // add infowindow
            cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['recareanam', 'parentacti', 'openstatus', 'latitude', 'longitude'])
          });

var cartoCSSBikeTrails = "#layer {" +
  "line-width: 1.5;" +
  "line-color: #d34dee;" +
  "line-opacity: 1;" +
"}"

//add data to map
var bikeTrails = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM bike_trails_proposed',
    cartocss: cartoCSSBikeTrails,

}]
}, { https: true })

.addTo(map)
.done(function(layer) {
          // add infowindow
          cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['name', 'miles', 'from_', 'to_'])
        });

var cartoCSSTrails = "#layer {" +
  "line-width: 1.5;" +
  "line-color: #1b8d63;" +
  "line-opacity: 1;" +
"}"

//add data to map
var trails = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM trailnfs',
    cartocss: cartoCSSTrails,

}]
}, { https: true })

.addTo(map)
.done(function(layer) {
          // add infowindow
          cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['trail_name', 'segment_le', 'trail_type'])
        });

var cartoCSSRecreationFacility = "#layer {" +
  "polygon-fill: #d35b7b;" +
  "polygon-opacity: 0.5;" +
  "line-width: 1;" +
  "line-color: #FFF;" +
  "line-opacity: 0.5;" +
"}"

//add data to map
var recreationFacility = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM recreation_facility',
    cartocss: cartoCSSRecreationFacility,
    layerIndex: 5
}]
}, { https: true })

.addTo(map)
.done(function(layer) {
          // add infowindow
          cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['facility', 'type', 'fac_open'])
        });

var cartoCSSScenicShorePoints = "#layer {" +
  "marker-width: 7;" +
  "marker-fill: #4ca3fa;" +
  "marker-fill-opacity: 0.9;" +
  "marker-allow-overlap: true;" +
  "marker-line-width: 1;" +
  "marker-line-color: #FFF;" +
  "marker-line-opacity: 1;" +
"}"

//add data to map
var scenicPoints = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM scenic_shoreline_points',
    cartocss: cartoCSSScenicShorePoints,
    layerIndex: 4
}]
}, { https: true })

.addTo(map)
.done(function(layer) {
          // add infowindow
          cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['view_type', 'unit_name'])
        });

var cartoCSSRiver = "#layer {" +
  "line-width: 2.5;" +
  "line-color: #73def9;" +
  "line-opacity: 1;" +
"}"

//add data to map
var river = cartodb.createLayer(map, {
    user_name: 'wilson38',
    type: 'cartodb',
    sublayers: [{type: "cartodb",
    sql: 'SELECT * FROM wildscenicriversegment',
    cartocss: cartoCSSRiver,
    layerIndex: 6
}]
}, { https: true })

.addTo(map)
.done(function(layer) {
          // add infowindow
          cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['gnis_name', 'total_mile'])
        });


// var cartoCSSSoils = "#layer {" +
//   "polygon-fill: ramp([muname],(#5F4690, #1D6996, #38A6A5, #0F8554, #73AF48, #EDAD08, #E17C05, #CC503E, #94346E, #6255a5, #666666), ("Cagwin-Rock outcrop complex, 15 to 30 percent slopes, extremely stony", "Cagwin Rock outcrop complex, 30 to 50 percent slopes, extremely stony", "Cassenai gravelly loamy coarse sand, 30 to 50 percent slopes, very stony", "Cassenai gravelly loamy coarse sand, 15 to 30 percent slopes, very stony", "Temo-Witefels complex, 30 to 50 percent slopes", "Oxyaquic Cryorthents-Aquic Xerorthents-Tahoe complex, 0 to 15 percent slopes", "Cagwin-Rock outcrop complex, 5 to 15 percent slopes, extremely stony", "Cagwin-Rock outcrop complex, 50 to 70 percent slopes, extremely stony", "Temo-Witefels complex, 15 to 30 percent slopes", "Water"), "=");"
//   "line-width: 1;" +
//   "line-color: #FFF;" +
//   "line-opacity: 0.5;" +
// "}"

//add data to map
// cartodb.createLayer(map, {
//     user_name: 'wilson38',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM soil_survey_2003',
//     cartocss: cartoCSSSoils,
//     layerIndex: 6
// }]
// }, { https: true })
//
// .addTo(map)

// load main() function
// window.onload = main;
// };

L.control.layers(river, scenicPoints, peaks, recreationActivity, bikeTrails, trails, recreationFacility).addTo(map);

$('#searchButton').click(function(){
  input = $( "#ad").val();
  var sql = new cartodb.SQL({ user: 'wilson38' });
  sql.getBounds("SELECT * FROM recreationactivities '" + input + "'").done(function(bounds) {
     map.fitBounds(bounds)
     });
   });

var recreationLocations = null;
var sqlQuery = "SELECT * FROM recreationactivities";
var sqlQueryHiking = "SELECT * FROM recreationactivities WHERE parentacti='Hiking'"
var cartoDBUserName = "wilson38";
// Function to add all coffee shops
function showAll(){
    if(map.hasLayer(recreationLocations)){
        map.removeLayer(recreationLocations);
    };
    // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
        recreationLocations = L.geoJson(data,{
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<p><b>' + feature.properties.recareanam + '</b><br /><em>' + feature.properties.parentacti + '</em></p>');
                layer.cartodb_id=feature.properties.cartodb_id;
            }
        }).addTo(map);
    });
};

// Run showAll function automatically when document loads
$( document ).ready(function() {
  showAll();
});
