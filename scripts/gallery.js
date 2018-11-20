const onClickButton = () => {
	let button = document.getElementsByClassName('button');
	button.onclick = () => {
		document.getElementsByClassName('gallery').style.display = 'flex';
	}
}

onClickButton();
