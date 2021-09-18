mapboxgl.accessToken =
	"pk.eyJ1IjoiZGhydXYwODExIiwiYSI6ImNrdHAyNzF3dzA2Y20zMHB1cGpjcDBhNTIifQ.z09KTM7QCabwRTJ0ljiOng";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [-79.4512, 43.6568],
	zoom: 4,
});

// Add the control to the map.

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	}),
	"top-right"
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

map.on("load", () => {
	map.addSource("reports", {
		type: "geojson",
		// Use a URL for the value for the `data` property.
		data: markers,
	});

	map.addLayer({
		id: "reports-layer",
		type: "circle",
		source: "reports",
		paint: {
			"circle-radius": 8,
			"circle-stroke-width": 2,
			"circle-color": "red",
			"circle-stroke-color": "white",
		},
	});
});
