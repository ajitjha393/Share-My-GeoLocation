export default class Modal {
	constructor(contentId, fallbackText) {
		this.fallbackText = fallbackText;
		this.contentTemplateEl = document.getElementById(contentId);

		this.modalTemplateEl = document.getElementById('modal-template');
	}

	show() {
		if ('content' in document.createElement('template')) {
			const modalElements = document.importNode(
				this.modalTemplateEl.content,
				true
			);

			const contentElements = document.importNode(
				this.contentTemplateEl.content,
				true
			);

			this.modalDiv = modalElements.querySelector('.modal');
			this.backdropDiv = modalElements.querySelector('.backdrop');

			this.modalDiv.appendChild(contentElements);

			document.body.insertAdjacentElement('afterbegin', this.modalDiv);
			document.body.insertAdjacentElement('afterbegin', this.backdropDiv);
		} else {
			// fallback for template tag
			alert(this.fallbackText);
		}
	}

	hide() {
		if (this.modalDiv) {
			document.body.removeChild(this.modalDiv);
			document.body.removeChild(this.backdropDiv);
			this.modalDiv = this.backdropDiv = null;
		}
	}
}
