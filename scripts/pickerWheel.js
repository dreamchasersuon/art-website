const artShow = () => {
	let art = document.getElementById('photo-select-three'),
		oil = document.getElementById('photo-select-one'),
		graph = document.getElementById('photo-select-two');
		graph.setAttribute("class", "select-block")
	art.onclick = () => {
		document.getElementById('graphics-block').style.display = 'none';
		document.getElementById('art-block').style.display = 'flex';
		graph.removeAttribute("class", "select-block");
		art.setAttribute("class", "select-block");
	}
	graph.onclick = () => {
		document.getElementById('graphics-block').style.display = 'flex';
		document.getElementById('art-block').style.display = 'none';
		graph.setAttribute("class", "select-block")
		art.removeAttribute("class", "select-block");
	}
}

artShow();