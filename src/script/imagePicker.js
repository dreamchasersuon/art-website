const gallery = document.querySelector('.Gallery-SliderPreview');
const galleryItems = document.querySelectorAll('.gallery-item');
const numOfItems = gallery.children.length;
const itemWidth = 23; // percent: as set in css
const featured = document.querySelector('.featured-item');


const selectItem = (e) => {
	if (e.target.classList.contains('active')) return;

	featured.style.backgroundImage = e.target.style.backgroundImage;

	for (let i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].classList.contains('active'))
			galleryItems[i].classList.remove('active');
	}

	e.target.classList.add('active');
}

const galleryWrapLeft = () => {
	let first = gallery.children[0];
	gallery.removeChild(first);
	gallery.style.left = -itemWidth + '%';
	gallery.appendChild(first);
	gallery.style.left = '0%';
}

const galleryWrapRight = () => {
	let last = gallery.children[gallery.children.length - 1];
	gallery.removeChild(last);
	gallery.insertBefore(last, gallery.children[0]);
	gallery.style.left = '-23%';
}


//Start this baby up
const init = () => {
	let images = [
		'../../src/img/big/graphics1.jpg',
		'../../src/img/big/graphics2.jpg',
		'../../src/img/big/graphics3.jpg',
		'../../src/img/big/graphics4.jpg',
		'../../src/img/big/graphics5.jpg',
		'../../src/img/big/graphics6.jpg',
		'../../src/img/big/graphics7.jpg',
		'../../src/img/big/graphics8.jpg',
		'../../src/img/big/graphics9.jpg',
		'../../src/img/big/graphics10.jpg'
	];

	//Set Initial Featured Image
	featured.style.backgroundImage = 'url(' + images[0] + ')';

	//Set Images for Gallery and Add Event Listeners
	for (let i = 0; i < galleryItems.length; i++) {
		galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
		galleryItems[i].addEventListener('click', selectItem);
	}
};
export { init, galleryWrapLeft, galleryWrapRight, selectItem };
