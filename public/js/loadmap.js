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

map.on("load", () => {
	// Add a new source from our GeoJSON data and
	// set the 'cluster' option to true. GL-JS will
	// add the point_count property to your source data.
	map.addSource("markers", {
		type: "geojson",
		// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
		// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
		data: markers,
		cluster: true,
		clusterMaxZoom: 14, // Max zoom to cluster points on
		clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
	});

	map.addLayer({
		id: "clusters",
		type: "circle",
		source: "markers",
		paint: {
			"circle-radius": 8,
			"circle-stroke-width": 2,
			"circle-color": "red",
			"circle-stroke-color": "white",
		},
	});

	map.addLayer({
		id: "clusters-layer",
		type: "circle",
		source: "markers",
		filter: ["has", "point_count"],
		paint: {
			// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
			// with three steps to implement three types of circles:
			//   * Blue, 20px circles when point count is less than 100
			//   * Yellow, 30px circles when point count is between 100 and 750
			//   * Pink, 40px circles when point count is greater than or equal to 750
			"circle-color": "red",
			"circle-radius": ["step", ["get", "point_count"], 15, 10, 22, 30, 29],
			"circle-stroke-color": "white",
			"circle-stroke-width": 2,
		},
	});

	map.addLayer({
		id: "cluster-count",
		type: "symbol",
		source: "markers",
		filter: ["has", "point_count"],
		layout: {
			"text-field": "{point_count_abbreviated}",
			"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
			"text-size": 12,
		},
	});

    const markerHeight = 10;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

	map.on("click", "clusters", (e) => {
		// Copy coordinates array.

		const coordinates = e.features[0].geometry.coordinates.slice();
		const { popUpContent } = e.features[0].properties;

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		new mapboxgl.Popup({ closeOnMove: true, offset: popupOffsets})
			.setLngLat(coordinates)
			.setHTML(popUpContent)
			.addTo(map);
	});

    map.on("click", "clusters-layer", (e) => {

        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const popup1 = new mapboxgl.Popup({ closeOnMove: true, offset: popupOffsets})
            .setLngLat(coordinates)
            .setText("Cluster")
            .addTo(map);

        var s = document.getElementById("statistics");
        s.setAttribute("style", "transform: translateX(350%); background-color: rgb(255,174,174); visibility: visible;");

        popup1.on('close', () => {
            s.setAttribute("style", "transform: translateX(350%); background-color: rgb(255,174,174); visibility: hidden;");
        });
    });


	// Change the cursor to a pointer when the mouse is over the places layer.
	map.on("mouseenter", "clusters", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	// Change it back to a pointer when it leaves.
	map.on("mouseleave", "clusters", () => {
		map.getCanvas().style.cursor = "";
	});
});
