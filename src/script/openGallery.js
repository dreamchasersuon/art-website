export default function openGallery () {
	let button = document.getElementsByClassName('Button_opened')[0];
	button.onclick = () => {
		document.getElementsByClassName('Gallery')[0].style.display = 'flex';
	}
}
