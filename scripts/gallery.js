const onClickButton = () => {
	let button = document.getElementsByClassName('button')[0];
	button.onclick = () => {
		document.getElementsByClassName('gallery')[0].style.display = 'flex';
	}
}

onClickButton();
