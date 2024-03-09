import {createThumbnails} from './thumbnails.js';
import {openFormLoader} from './img-upload-form.js';
import {getData} from './network.js';

getData().then((data) => {
  createThumbnails(data);
});
openFormLoader();
//сделать % в скейл и туфикс в еффектс
