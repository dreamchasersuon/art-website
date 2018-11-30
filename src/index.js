import closeGallery from './script/closeGallery.js';
import openGallery from './script/openGallery.js';
import './style/style.css';
import { init, selectItem } from './script/imagePicker.js';

window.onload = () => {
  closeGallery();
  openGallery();
  init();
  selectItem();
}
