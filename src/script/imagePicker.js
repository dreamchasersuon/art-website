const gallery = document.querySelector('.Gallery-SliderPreview');
const galleryItems = document.querySelectorAll('.gallery-item');
const numOfItems = gallery.children.length;
const itemWidth = 23;
const featured = document.querySelector('.featured-item');
const featureImages = [
	'../../src/img/big/g1.jpg',
	'../../src/img/big/g2.jpg',
	'../../src/img/big/g3.jpg',
	'../../src/img/big/g4.jpg',
	'../../src/img/big/g5.jpg',
	'../../src/img/big/g6.jpg',
	'../../src/img/big/g7.jpg',
	'../../src/img/big/g8.jpg',
	'../../src/img/big/g9.jpg',
	'../../src/img/big/g10.jpg',
	'../../src/img/big/g11.jpg',
	'../../src/img/big/g12.jpg',
	'../../src/img/big/g13.jpg',
	'../../src/img/big/g14.jpg',
	'../../src/img/big/g15.jpg',
	'../../src/img/big/g16.jpg',
	'../../src/img/big/g17.jpg',
	'../../src/img/big/g18.jpg',
	'../../src/img/big/g19.jpg',
	'../../src/img/big/g20.jpg',
	'../../src/img/big/g21.jpg',
	'../../src/img/big/g22.jpg',
	'../../src/img/big/g23.jpg',
	'../../src/img/big/g24.jpg',
	'../../src/img/big/g25.jpg',
	'../../src/img/big/g26.jpg',
	'../../src/img/big/g27.jpg',
	'../../src/img/big/g28.jpg',
	'../../src/img/big/g29.jpg',
	'../../src/img/big/g30.jpg',
	'../../src/img/big/g31.jpg',
	'../../src/img/big/g32.jpg',
	'../../src/img/big/g33.jpg',
	'../../src/img/big/g34.jpg',
	'../../src/img/big/g35.jpg',
	'../../src/img/big/g36.jpg',
	'../../src/img/big/g37.jpg',
	'../../src/img/big/g38.jpg'
];
const images = [
	'../../src/img/small/g1.jpg',
	'../../src/img/small/g2.jpg',
	'../../src/img/small/g3.jpg',
	'../../src/img/small/g4.jpg',
	'../../src/img/small/g5.jpg',
	'../../src/img/small/g6.jpg',
	'../../src/img/small/g7.jpg',
	'../../src/img/small/g8.jpg',
	'../../src/img/small/g9.jpg',
	'../../src/img/small/g10.jpg',
	'../../src/img/small/g11.jpg',
	'../../src/img/small/g12.jpg',
	'../../src/img/small/g13.jpg',
	'../../src/img/small/g14.jpg',
	'../../src/img/small/g15.jpg',
	'../../src/img/small/g16.jpg',
	'../../src/img/small/g17.jpg',
	'../../src/img/small/g18.jpg',
	'../../src/img/small/g19.jpg',
	'../../src/img/small/g20.jpg',
	'../../src/img/small/g21.jpg',
	'../../src/img/small/g22.jpg',
	'../../src/img/small/g23.jpg',
	'../../src/img/small/g24.jpg',
	'../../src/img/small/g25.jpg',
	'../../src/img/small/g26.jpg',
	'../../src/img/small/g27.jpg',
	'../../src/img/small/g28.jpg',
	'../../src/img/small/g29.jpg',
	'../../src/img/small/g30.jpg',
	'../../src/img/small/g31.jpg',
	'../../src/img/small/g32.jpg',
	'../../src/img/small/g33.jpg',
	'../../src/img/small/g34.jpg',
	'../../src/img/small/g35.jpg',
	'../../src/img/small/g36.jpg',
	'../../src/img/small/g37.jpg',
	'../../src/img/small/g38.jpg'
];
const imagesHandMade = [
	'../../src/img/small/hm1.jpg',
	'../../src/img/small/hm2.jpg',
	'../../src/img/small/hm3.jpg',
	'../../src/img/small/hm4.jpg',
	'../../src/img/small/hm5.jpg',
	'../../src/img/small/hm6.jpg',
	'../../src/img/small/hm7.jpg',
	'../../src/img/small/hm8.jpg',
	'../../src/img/small/hm9.jpg',
	'../../src/img/small/hm10.jpg',
	'../../src/img/small/hm11.jpg',
	'../../src/img/small/hm12.jpg',
	'../../src/img/small/hm13.jpg',
	'../../src/img/small/hm14.jpg',
	'../../src/img/small/hm15.jpg',
	'../../src/img/small/hm16.jpg',
	'../../src/img/small/hm17.jpg',
	'../../src/img/small/hm18.jpg',
	'../../src/img/small/hm19.jpg',
	'../../src/img/small/hm20.jpg'
];
const featureImagesHandMade = [
	'../../src/img/big/hm1.jpg',
	'../../src/img/big/hm2.jpg',
	'../../src/img/big/hm3.jpg',
	'../../src/img/big/hm4.jpg',
	'../../src/img/big/hm5.jpg',
	'../../src/img/big/hm6.jpg',
	'../../src/img/big/hm7.jpg',
	'../../src/img/big/hm8.jpg',
	'../../src/img/big/hm9.jpg',
	'../../src/img/big/hm10.jpg',
	'../../src/img/big/hm11.jpg',
	'../../src/img/big/hm12.jpg',
	'../../src/img/big/hm13.jpg',
	'../../src/img/big/hm14.jpg',
	'../../src/img/big/hm15.jpg',
	'../../src/img/big/hm16.jpg',
	'../../src/img/big/hm17.jpg',
	'../../src/img/big/hm18.jpg',
	'../../src/img/big/hm19.jpg',
	'../../src/img/big/hm20.jpg'
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
