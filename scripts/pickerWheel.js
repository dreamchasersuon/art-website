const artShow = () => {
	let art = document.getElementsByClassName('photo-select-three'),
		oil = document.getElementsByClassName('photo-select-one'),
		graph = document.getElementsByClassName('photo-select-two');
		graph.setAttribute("id", "select-block")
	art.onclick = () => {
		document.getElementsByClassName('graphics-block').style.display = 'none';
		document.getElementsByClassName('art-block').style.display = 'flex';
		graph.removeAttribute("id", "select-block");
		art.setAttribute("id", "select-block");
	}
	graph.onclick = () => {
		document.getElementsByClassName('graphics-block').style.display = 'flex';
		document.getElementsByClassName('art-block').style.display = 'none';
		graph.setAttribute("id", "select-block")
		art.removeAttribute("id", "select-block");
	}
}

artShow();
