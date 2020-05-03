import Modal from './UI/Modal';
import Map from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';
class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');

		this.shareBtn = document.getElementById('share-btn');

		locateUserBtn.addEventListener(
			'click',
			this.locateUserHandler.bind(this)
		);

		addressForm.addEventListener(
			'submit',
			this.findAddressHandler.bind(this)
		);
		this.shareBtn.addEventListener('click', this.sharePlaceHandler);
	}

	async sharePlaceHandler() {
		const sharedLinkInputElement = document.getElementById('share-link');

		if (!('clipboard' in navigator)) {
			sharedLinkInputElement.select();
			return;
		}
		try {
			await navigator.clipboard.writeText(sharedLinkInputElement.value);

			alert('Shareable URL copied to clipboard');
		} catch (err) {
			console.log('Something failed');
			sharedLinkInputElement.select();
		}
	}

	selectPlace(coordinates, address) {
		// This makes sure we dont create only once and just change the coordinates
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}
		this.shareBtn.disabled = false;
		const sharedLinkInputElement = document.getElementById('share-link');

		sharedLinkInputElement.value = `${
			location.origin
		}/my-place/index.html?address=${encodeURI(address)}&lat=${
			coordinates.lat
		}&lng=${coordinates.lng}`;
	}

	locateUserHandler() {
		if (!navigator.geolocation) {
			alert(
				'Location feature not supported in your browser...Please use a modern browser or manually enter an address'
			);
			return;
		}

		const modal = new Modal(
			'loading-modal-content',
			'Loding-location please wait!'
		);

		modal.show();
		// setTimeout(null, 2000);

		// Some delay so that we see consistent modal
		setTimeout(() => {
			console.log(this);
			navigator.geolocation.getCurrentPosition(
				async successResult => {
					const coordinates = {
						lat: successResult.coords.latitude,
						lng: successResult.coords.longitude,
					};
					const address = await getAddressFromCoords(coordinates);
					this.selectPlace(coordinates, address);
					console.log(coordinates);

					modal.hide();
				},
				err => {
					modal.hide();
					alert(
						'Could not locate you unfortunately...Please add your address manually'
					);
				}
			);
		}, 500);
	}
	async findAddressHandler(event) {
		event.preventDefault();
		const address = event.target.querySelector('input').value.trim();
		if (!address || address.length === 0) {
			alert('Invalid address entered - Please try again');
			return;
		}

		const modal = new Modal(
			'loading-modal-content',
			'Loding location - please wait!'
		);

		modal.show();
		try {
			const coordinates = await getCoordsFromAddress(address);

			const coordsObj = {
				lng: coordinates[0],
				lat: coordinates[1],
			};

			this.selectPlace(coordsObj, address);
		} catch (err) {
			console.log('Some error occured...', err.message);
		}

		modal.hide();
	}
}

new PlaceFinder();
