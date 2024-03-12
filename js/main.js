import {openFormLoader} from './img-upload-form.js';
import {getData} from './network.js';
import {openFiltersBlock} from './sorting-filters.js';

getData().then((data) => {
  openFiltersBlock(data);
});
openFormLoader();
