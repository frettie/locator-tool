angular.module('app').component('ltMap', {
  bindings: {
    mapView: '<',
    mapMarker: '<',
    mapObjectLocation: '<'
  },
  templateUrl: 'app/components/ltMap/ltMap.html',
  controller: ltMap
});

function ltMap() {
  var vm = this;
  vm.mapInit = function(L, map) {
    var wm = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Wikimedia maps | Map data &copy; ' +
          '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var osm = L.tileLayer('https://tiles.wmflabs.org/osm/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">' +
          'OpenStreetMap</a> contributors'
    });
    var osmOrg = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">' +
          'OpenStreetMap</a> contributors'
    });
    L.control.layers({
      'OSM': osmOrg,
      'OSM @wmflabs.org': osm,
      'Wikimedia maps': wm
    }).addTo(map);
    osm.addTo(map);
    new L.Control.GeoSearch({
      provider: new L.GeoSearch.Provider.OpenStreetMap(),
      showMarker: false
    }).addTo(map);
  };

  vm.mapClick = function($event) {
    if ($event.latlng) {
      vm.mapMarker.lat = $event.latlng.lat;
      vm.mapMarker.lng = $event.latlng.lng;
    }
  };
}