export default function closeGallery () {
	let button = document.getElementsByClassName('Gallery-Button_closed')[0];
	button.onclick = () => {
		document.getElementsByClassName('Gallery')[0].style.display = 'none';
	}
}
