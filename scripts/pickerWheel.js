const artShow = () => {
	let art = document.getElementsByClassName('photo-select-three')[0],
		oil = document.getElementsByClassName('photo-select-one')[0],
		graph = document.getElementsByClassName('photo-select-two')[0];
		graph.setAttribute("id", "select-block")
	art.onclick = () => {
		document.getElementsByClassName('graphics-block')[0].style.display = 'none';
		document.getElementsByClassName('art-block')[0].style.display = 'flex';
		graph.removeAttribute("id", "select-block");
		art.setAttribute("id", "select-block");
	}
	graph.onclick = () => {
		document.getElementsByClassName('graphics-block')[0].style.display = 'flex';
		document.getElementsByClassName('art-block')[0].style.display = 'none';
		graph.setAttribute("id", "select-block")
		art.removeAttribute("id", "select-block");
	}
}

artShow();
