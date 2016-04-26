'use strict'

$(document).ready(start)

var map, layer = false

function initialize_leaflet() {
  map = new L.Map('map').setView([51.505, -0.09], 13);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    subdomains: 'abc'
  }).addTo(map)
}


function draw_polyline(poly) {

  var latlngs = polyline.decode(poly).map(function(point) {
    return new L.LatLng(point[0], point[1])
  })
  if (!layer) {
    layer = new L.Polyline(latlngs, {
      color: 'red',
      opacity: 0.8,
      weight: 5
    });
    map.addLayer(layer)

  } else {
    layer.setLatLngs(latlngs)
  }

  map.fitBounds(new L.LatLngBounds(latlngs))
}

function start() {
  initialize_leaflet()

  // check if there's some hash
  var hash = window.location.hash
  if (hash !== '') {
    draw_polyline(hash.slice(1))
    $('#polyline_data').val(hash.slice(1))
  }

  $('#polyline_data').on('keyup', draw_polyline)

}