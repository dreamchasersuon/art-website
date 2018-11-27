export default function openGallery () {
	let button = document.getElementsByClassName('Button_opened')[0],
	 		background = document.getElementsByClassName('BodyDivisorBlack-MainGroup')[0],
			gallery = document.getElementsByClassName('Gallery')[0];
	button.onclick = () => {
		gallery.style.display = 'flex';
		background.style.filter = 'blur(5px)';
	}
}
