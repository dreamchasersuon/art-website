const onClickButton = () => {
	let button = document.getElementsByClassName('button')[0];
	button.onclick = () => {
		document.getElementsByClassName('gallery').style.display = 'flex';
	}
}

onClickButton();
