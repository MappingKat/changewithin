/* jshint camelcase: false */

var NPMap;

NPMap = {
  baseLayers: ['mapbox-terrain'],
  center: {
    lat: 35.600649300000000000,
    lng: -83.508774500000010000
  },
  div: 'map',
  fullscreenControl: true,
  homeControl: {
    position: 'topright'
  },
  modules: [{
    content: '<div id="my-custom-module"></div>',
    icon: 'search',
    title: 'Search',
    type: 'custom',
    visible: false
  }],
  overlays: [{
    type: 'geojson',
    style: {
      'color': '#ff7800',
      'weight': 5,
      'opacity': 0.65
    },
    url: 'https://raw.githubusercontent.com/nationalparkservice/data/gh-pages/base_data/boundaries/parks/grsm.geojson',
  }],
  printControl: true,
  shareControl: true,
  smallzoomControl: {
    position: 'topright'
  },
  zoom: 10
};

(function() {
  var s = document.createElement('script');
  s.src = 'http://www.nps.gov/npmap/npmap.js/latest/npmap-bootstrap.min.js';
  document.body.appendChild(s);
})();