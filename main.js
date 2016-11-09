var satAttr = 'Modified <a href="https://scihub.copernicus.eu/">Copernicus</a>' +
    ' Sentinel data 2016 by ' +
    '<a href="http://sentinelmap.eu">SentinelMap</a>' ;

var osmAttr = ' | © <a href="https://openstreetmap.org/copyright">OSM</a>' +
    ' contributors data by ' +
    '<a href="https://mapzen.com">Mapzen</a>' ;

var Attr = satAttr + osmAttr ;

var OSM0 = '<a href="http://www.openstreetmap.org/way/'
var OSM1 = '/" target="_blank">View on OSM</a> </br>'
var iD0 = '<a href="http://www.openstreetmap.org/edit?way='
var iD1 = '" target="_blank">Edit with iD</a>'

var scLayer = Tangram.leafletLayer({
    scene: 'scene.yaml',
    attribution: Attr,
    events: {
	hover: function(selection) {
	    if (selection.feature != null & map.getZoom() >= 17) {
		document.getElementById('map').style.cursor = 'pointer'
	    } else {
		document.getElementById('map').style.cursor = ''
	    }
	},
	click: function(selection) {
	    //console.log(selection);
	    if (selection.feature != null & map.getZoom() >= 17) {
		fid = String(selection.feature.properties.id);
		latlng = selection.leaflet_event.latlng;
		var popup = L.popup({ className: 'custom' })
		    .setLatLng(latlng)
		    .setContent(OSM0 + fid + OSM1 + iD0 + fid + iD1)
		    .openOn(map);
	    } //end of if
	} //end of click
    } //end of events
});

var map = L.map('map' , {
    center: [ 42.629, 13.2872],
    zoom: 15,
    maxZoom: 18,
    minZoom: 6,
    layers: [scLayer],
    zoomControl: false
});

var hash = new L.Hash(map);

var baseLayers = {
    "Sentinel-2": scLayer,
};

L.control.zoom({position: 'topright'}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

// DEBUG
/*
scLayer.scene.subscribe({
    load: function (e) {
        console.log('scene loaded:', e);
    }
});

scLayer.scene.subscribe({
    view_complete: function () {
	console.log('scene view complete');
    }
});
*/
