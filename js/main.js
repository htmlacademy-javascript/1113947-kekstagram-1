import {createPhotos} from './data-generation.js';
import {createThumbnails} from './thumbnails.js';
import {openFormLoader} from './img-upload-form.js';

const generatedPhotos = createPhotos();
createThumbnails(generatedPhotos);

openFormLoader();
