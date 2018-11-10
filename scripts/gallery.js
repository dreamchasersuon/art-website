const onClickButton = () => {
	let button = document.getElementById('button');
	button.onclick = () => {
		document.getElementById('gallery').style.display = 'flex';
	}
}

onClickButton();