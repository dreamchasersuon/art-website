export default function pickerWheel () {
	let art = document.getElementsByClassName('Nav-ItemArt')[0],
		oil = document.getElementsByClassName('Nav-ItemOil')[0],
		graph = document.getElementsByClassName('Nav-ItemGraphics')[0];
		graph.setAttribute("class", "select-block")
	art.onclick = () => {
		document.getElementsByClassName('GalleryWrapper-ItemGraphics')[0].style.display = 'none';
		document.getElementsByClassName('GalleryWrapper-ItemArt')[0].style.display = 'flex';
		graph.removeAttribute("class", "select-block");
		art.setAttribute("class", "select-block");
	}
	graph.onclick = () => {
		document.getElementsByClassName('GalleryWrapper-ItemGraphics')[0].style.display = 'flex';
		document.getElementsByClassName('GalleryWrapper-ItemArt')[0].style.display = 'none';
		graph.setAttribute("class", "select-block")
		art.removeAttribute("class", "select-block");
	}
}
