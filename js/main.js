import {createPhotos} from './data-generation.js';
import {createThumbnails} from './thumbnails.js';

const generatedPhotos = createPhotos();
createThumbnails(generatedPhotos);
