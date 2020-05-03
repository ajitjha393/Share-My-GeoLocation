import MapboxToken from '../../Mapbox-token';
export default class Map {
	constructor(coords) {
		// this.coordinates = coords;
		this.accessToken = MapboxToken.token;
		this.render(coords);
	}

	render(coords) {
		if (!L) {
			alert('Could not load maps library - please try again later');
			return;
		}

		const coordsArray = [coords.lat, coords.lng];
		const zoom = 13;
		if (this.mymap) {
			this.mymap.panTo(new L.LatLng(...coordsArray));
			this.mymap.removeLayer(this.marker);
			this.marker = L.marker(coordsArray).addTo(this.mymap);
			return;
		}
		this.mymap = L.map('map').setView(coordsArray, zoom);
		this.marker = L.marker(coordsArray).addTo(this.mymap);

		L.tileLayer(
			`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`,
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: 'your.mapbox.access.token',
			}
		).addTo(this.mymap);
	}
}

// pk.eyJ1IjoiYWppdGpoYTM5MyIsImEiOiJjazlyMmV6MG4wcWFpM2ZtZWd6NDRocTY3In0.c4CuFGixUTopj8Cpl68AFQ
