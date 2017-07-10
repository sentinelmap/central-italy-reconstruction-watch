var satAttr = 'Modified <a href="https://scihub.copernicus.eu/">Copernicus</a>' +
    ' Sentinel data 2016 by ' +
    '<a href="http://sentinelmap.eu">SentinelMap</a>' ;
var osmAttr = ' | © <a href="https://openstreetmap.org/copyright">OSM</a>' +
    ' contributors data by ' +
    '<a href="https://mapzen.com">Mapzen</a>' ;
var attr = satAttr + osmAttr ;

// https://mapzen.com/documentation/vector-tiles/layers/#boundaries-properties-optional
// osm_relation: true, which can also be deduced from negative id values.

var tit = 'Earthquake damage: </br>'
var OSM0 = '</br> <a href="https://www.openstreetmap.org/'
var OSM1 = '/" target="_blank">View on OSM</a> </br>'
var iD0 = '<a href="https://www.openstreetmap.org/edit?'
var iD1 = '" target="_blank">Edit with iD</a>'

var layer = Tangram.leafletLayer({
    scene: {
	import: ['global.yaml'],
	global: {'labels_overlay': true,
		 'roads_overlay': true},
    },
    attribution: attr,
    events: {
	hover: function(selection) {
	    if (selection.feature != null & map.getZoom() >= 17) {
		document.getElementById('map').style.cursor = 'pointer'
	    } else {
		document.getElementById('map').style.cursor = ''
	    }
	},
	click: function(selection) {
	    // console.log(selection);
	    if (selection.feature != null & map.getZoom() >= 17) {
		latlng = selection.leaflet_event.latlng;
		// info elements
		bb = String(selection.feature.layers);
		dam = String(bb.split('buildings:', 2)[1]);
		dam = dam.replace(',', '');
		dam = dam.replace('_damage', '');
		// link elements
		fid = selection.feature.properties.id;
		if(fid >= 0) { type= 'way' } else { type='relation' }
		str_id = String( Math.abs(fid) )
		var popup = L.popup({ className: 'custom' })
		    .setLatLng(latlng)
		    .setContent(tit + dam +
				OSM0 + type + '/' + str_id + OSM1 +
				iD0 + type + '=' + str_id + iD1)
		    .openOn(map);
	    } //end of if
	} //end of click
    } //end of events
});
var scene = layer.scene;

var map = L.map('map' , {
    center: [ 42.629, 13.2872],
    zoom: 15,
    maxZoom: 18,
    minZoom: 5,
    layers: [layer],
    zoomControl: false
});
L.control.zoom({position: 'bottomright'}).addTo(map);

var hash = new L.Hash(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

// DEBUG

/*
scene.subscribe({
    load: function (e) {
        console.log('scene loaded:', e);
    }
});

scene.subscribe({
    view_complete: function () {
	console.log('scene view complete');
    }
});
*/
