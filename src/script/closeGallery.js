export default function closeGallery () {
	let button = document.getElementsByClassName('Gallery-Button_closed')[0],
			background = document.getElementsByClassName('BodyDivisorBlack-MainGroup')[0],
			gallery = document.getElementsByClassName('Gallery')[0];
	button.onclick = () => {
		gallery.style.display = 'none';
		background.style.filter = 'none';
	}
}
