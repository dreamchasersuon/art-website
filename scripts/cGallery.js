const closeGallery = () => {
	let button = document.getElementById('close-button');
	button.onclick = () => {
		document.getElementById('gallery').style.display = 'none';
	}
}

closeGallery();