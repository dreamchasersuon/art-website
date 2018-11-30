const gallery = document.querySelector('.Gallery-SliderPreview');
const galleryItems = document.querySelectorAll('.gallery-item');
const numOfItems = gallery.children.length;
const itemWidth = 23; // percent: as set in css
const featured = document.querySelector('.featured-item');
const featureImages = [
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
	'../../src/img/big/graphics36.jpg',
	'../../src/img/big/graphics37.jpg',
	'../../src/img/big/graphics38.jpg'
];
const images = [
	'../../src/img/small/graphics1.jpg',
	'../../src/img/small/graphics2.jpg',
	'../../src/img/small/graphics3.jpg',
	'../../src/img/small/graphics4.jpg',
	'../../src/img/small/graphics5.jpg',
	'../../src/img/small/graphics6.jpg',
	'../../src/img/small/graphics7.jpg',
	'../../src/img/small/graphics8.jpg',
	'../../src/img/small/graphics9.jpg',
	'../../src/img/small/graphics10.jpg',
	'../../src/img/small/graphics11.jpg',
	'../../src/img/small/graphics12.jpg',
	'../../src/img/small/graphics13.jpg',
	'../../src/img/small/graphics14.jpg',
	'../../src/img/small/graphics15.jpg',
	'../../src/img/small/graphics16.jpg',
	'../../src/img/small/graphics17.jpg',
	'../../src/img/small/graphics18.jpg',
	'../../src/img/small/graphics19.jpg',
	'../../src/img/small/graphics20.jpg',
	'../../src/img/small/graphics21.jpg',
	'../../src/img/small/graphics22.jpg',
	'../../src/img/small/graphics23.jpg',
	'../../src/img/small/graphics24.jpg',
	'../../src/img/small/graphics25.jpg',
	'../../src/img/small/graphics26.jpg',
	'../../src/img/small/graphics27.jpg',
	'../../src/img/small/graphics28.jpg',
	'../../src/img/small/graphics29.jpg',
	'../../src/img/small/graphics30.jpg',
	'../../src/img/small/graphics31.jpg',
	'../../src/img/small/graphics32.jpg',
	'../../src/img/small/graphics33.jpg',
	'../../src/img/small/graphics34.jpg',
	'../../src/img/small/graphics35.jpg',
	'../../src/img/small/graphics36.jpg',
	'../../src/img/small/graphics37.jpg',
	'../../src/img/small/graphics38.jpg'
];
const imagesHandMade = [
	'../../src/img/small/handMade1.jpg',
	'../../src/img/small/handMade2.jpg',
	'../../src/img/small/handMade3.jpg',
	'../../src/img/small/handMade4.jpg',
	'../../src/img/small/handMade5.jpg',
	'../../src/img/small/handMade6.jpg',
	'../../src/img/small/handMade7.jpg',
	'../../src/img/small/handMade8.jpg',
	'../../src/img/small/handMade9.jpg',
	'../../src/img/small/handMade10.jpg',
	'../../src/img/small/handMade11.jpg',
	'../../src/img/small/handMade12.jpg',
	'../../src/img/small/handMade13.jpg',
	'../../src/img/small/handMade14.jpg',
	'../../src/img/small/handMade15.jpg',
	'../../src/img/small/handMade16.jpg',
	'../../src/img/small/handMade17.jpg',
	'../../src/img/small/handMade18.jpg',
	'../../src/img/small/handMade19.jpg',
	'../../src/img/small/handMade20.jpg'
];
const featureImagesHandMade = [
	'../../src/img/big/handMade1.jpg',
	'../../src/img/big/handMade2.jpg',
	'../../src/img/big/handMade3.jpg',
	'../../src/img/big/handMade4.jpg',
	'../../src/img/big/handMade5.jpg',
	'../../src/img/big/handMade6.jpg',
	'../../src/img/big/handMade7.jpg',
	'../../src/img/big/handMade8.jpg',
	'../../src/img/big/handMade9.jpg',
	'../../src/img/big/handMade10.jpg',
	'../../src/img/big/handMade11.jpg',
	'../../src/img/big/handMade12.jpg',
	'../../src/img/big/handMade13.jpg',
	'../../src/img/big/handMade14.jpg',
	'../../src/img/big/handMade15.jpg',
	'../../src/img/big/handMade16.jpg',
	'../../src/img/big/handMade17.jpg',
	'../../src/img/big/handMade18.jpg',
	'../../src/img/big/handMade19.jpg',
	'../../src/img/big/handMade20.jpg'
];

const selectItem = (e) => {
	if (e.target.classList.contains('active')) return;

	featured.style.backgroundImage = e.target.style.backgroundImage.replace("/small/", "/big/");

	for (let i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].classList.contains('active'))
			galleryItems[i].classList.remove('active');
	}
	e.target.classList.add('active');
}

//Start this baby up
const init = () => {
	//Set Initial Featured Image
	featured.style.backgroundImage = 'url(' + featureImages[0] + ')';
	//Set Images for Gallery and Add Event Listeners
	for (let i = 0; i < galleryItems.length; i++) {
		galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
		galleryItems[i].addEventListener('click', selectItem);
	}
};
export { init, selectItem };
