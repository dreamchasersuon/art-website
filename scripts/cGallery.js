const closeGallery = () => {
	let button = document.getElementsByClassName('close-button');
	button.onclick = () => {
		document.getElementsByClassName('gallery').style.display = 'none';
	}
}

closeGallery();
