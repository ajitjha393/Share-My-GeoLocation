import MapboxToken from '../../Mapbox-token';
// Forward geocoding
export const getCoordsFromAddress = async address => {
	const urlAddress = encodeURI(address);
	console.log(urlAddress);

	const response = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=${MapboxToken.token}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch coordinates, Try again');
	}

	const data = await response.json();
	console.log(data);

	const coordinates = data.features[0].geometry.coordinates; // [lng,lat]

	console.log(coordinates);

	return coordinates;
};

// Reverse geocoding

export const getAddressFromCoords = async coords => {
	const response = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${MapboxToken.token}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch coordinates, Try again');
	}

	const data = await response.json();
	const address = data.features[0].place_name;
	console.log(address);
	return address;
};
