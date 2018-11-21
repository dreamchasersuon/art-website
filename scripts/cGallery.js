const closeGallery = () => {
	let button = document.getElementsByClassName('close-button')[0];
	button.onclick = () => {
		document.getElementsByClassName('gallery')[0].style.display = 'none';
	}
}

closeGallery();
