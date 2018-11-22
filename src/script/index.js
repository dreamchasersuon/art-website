const cGallery = require('./cGallery.js');
const gallery = require('./gallery.js');
const pickerWheel = require('./pickerWheel.js');
const imagePicker = require('./imagePicker.js');

window.onload = () => {
  cGallery();
  gallery();
  pickerWheel();
  imagePicker();
}
