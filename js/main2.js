// function main() {
var map = L.map('map', {
    center: L.latLng(6.8770, 31.3070),
    zoom: 11
});

var basemap = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

basemap.addTo(map);
