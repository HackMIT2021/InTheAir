mapboxgl.accessToken =
	"pk.eyJ1IjoiZGhydXYwODExIiwiYSI6ImNrdHAyNzF3dzA2Y20zMHB1cGpjcDBhNTIifQ.z09KTM7QCabwRTJ0ljiOng";
const coordinate = [];
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [-89.38098128842597, 43.07928889673647],
	zoom: 12,
});

map.doubleClickZoom.disable();

// Add the control to the map.

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	})
);

// Add geolocate control to the map.

map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		// When active the map will receive updates to the device's location as it changes.
		trackUserLocation: true,
		// Draw an arrow next to the location dot to indicate which direction the device is heading.
		showUserHeading: true,
	})
);

var currentLocationMarker = new mapboxgl.Marker({ color: "red" }).setLngLat([-79.4512, 43.6568]);

map.on("dblclick", async (e) => {
	currentLocationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
	document.getElementById("lng").value = e.lngLat.lng;
	document.getElementById("lat").value = e.lngLat.lat;
});

map.on("load", () => {});
