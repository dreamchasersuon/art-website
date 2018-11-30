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
		'../../src/img/small/graph1.jpg',
		'../../src/img/small/graph2.jpg',
		'../../src/img/small/graph3.jpg',
		'../../src/img/small/graph4.jpg',
		'../../src/img/small/graph5.jpg',
		'../../src/img/small/graph6.jpg',
		'../../src/img/small/graph7.jpg',
		'../../src/img/small/graph8.jpg',
		'../../src/img/small/graph9.jpg',
		'../../src/img/small/graph10.jpg',
    '../../src/img/small/graph11.jpg',
    '../../src/img/small/graph12.jpg',
    '../../src/img/small/graph13.jpg',
    '../../src/img/small/graph14.jpg',
    '../../src/img/small/graph15.jpg',
    '../../src/img/small/graph16.jpg',
    '../../src/img/small/graph17.jpg',
    '../../src/img/small/graph18.jpg',
    '../../src/img/small/graph19.jpg',
    '../../src/img/small/graph20.jpg',
    '../../src/img/small/graph21.jpg',
    '../../src/img/small/graph22.jpg',
    '../../src/img/small/graph23.jpg',
    '../../src/img/small/graph24.jpg',
    '../../src/img/small/graph25.jpg',
    '../../src/img/small/graph26.jpg',
    '../../src/img/small/graph27.jpg',
    '../../src/img/small/graph28.jpg',
    '../../src/img/small/graph29.jpg',
    '../../src/img/small/graph30.jpg',
    '../../src/img/small/graph31.jpg',
    '../../src/img/small/graph32.jpg',
    '../../src/img/small/graph33.jpg',
    '../../src/img/small/graph34.jpg',
    '../../src/img/small/graph35.jpg',
    '../../src/img/small/graph36.jpg'
	];
  let featureImages = [
    '../../src/img/big/graphics1.jpg',
		'../../src/img/big/graphics2.jpg',
		'../../src/img/big/graphics3.jpg',
		'../../src/img/big/graphics4.jpg',
		'../../src/img/big/graphics5.jpg',
		'../../src/img/big/graphics6.jpg',
		'../../src/img/big/graphics7.jpg',
		'../../src/img/big/graphics8.jpg',
		'../../src/img/big/graphics9.jpg',
		'../../src/img/big/graphics10.jpg',
    '../../src/img/big/graphics11.jpg',
    '../../src/img/big/graphics12.jpg',
    '../../src/img/big/graphics13.jpg',
    '../../src/img/big/graphics14.jpg',
    '../../src/img/big/graphics15.jpg',
    '../../src/img/big/graphics16.jpg',
    '../../src/img/big/graphics17.jpg',
    '../../src/img/big/graphics18.jpg',
    '../../src/img/big/graphics19.jpg',
    '../../src/img/big/graphics20.jpg',
    '../../src/img/big/graphics21.jpg',
    '../../src/img/big/graphics22.jpg',
    '../../src/img/big/graphics23.jpg',
    '../../src/img/big/graphics24.jpg',
    '../../src/img/big/graphics25.jpg',
    '../../src/img/big/graphics26.jpg',
    '../../src/img/big/graphics27.jpg',
    '../../src/img/big/graphics28.jpg',
    '../../src/img/big/graphics29.jpg',
    '../../src/img/big/graphics30.jpg',
    '../../src/img/big/graphics31.jpg',
    '../../src/img/big/graphics32.jpg',
    '../../src/img/big/graphics33.jpg',
    '../../src/img/big/graphics34.jpg',
    '../../src/img/big/graphics35.jpg',
    '../../src/img/big/graphics36.jpg'
	];
	//Set Initial Featured Image
	featured.style.backgroundImage = 'url(' + featureImages[0] + ')';

	//Set Images for Gallery and Add Event Listeners
	for (let i = 0; i < galleryItems.length; i++) {
		galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
		galleryItems[i].addEventListener('click', selectItem);
	}
};
export { init, galleryWrapLeft, galleryWrapRight, selectItem };
