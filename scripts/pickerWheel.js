const artShow = () => {
	let art = document.getElementsByClassName('photo-select-three')[0],
		oil = document.getElementsByClassName('photo-select-one')[0],
		graph = document.getElementsByClassName('photo-select-two')[0];
		graph.setAttribute("class", "select-block")
	art.onclick = () => {
		document.getElementsByClassName('graphics-block')[0].style.display = 'none';
		document.getElementsByClassName('art-block')[0].style.display = 'flex';
		graph.removeAttribute("class", "select-block");
		art.setAttribute("class", "select-block");
	}
	graph.onclick = () => {
		document.getElementsByClassName('graphics-block')[0].style.display = 'flex';
		document.getElementsByClassName('art-block')[0].style.display = 'none';
		graph.setAttribute("class", "select-block")
		art.removeAttribute("class", "select-block");
	}
}

artShow();
