const thumbnailsTemplate = document.querySelector('#picture').content;
const thumbnailBlock = thumbnailsTemplate.querySelector('a');
const documentThumbnailsPictures = document.querySelector('.pictures');

const createThumbnails = function (photosList) {
  const photosThumbnailsFragment = document.createDocumentFragment();

  let i = 0;
  while (photosList.length > i) {
    const thumbnailElement = thumbnailBlock.cloneNode(true);
    const thumbnailElementImg = thumbnailElement.querySelector('.picture__img');
    const thumbnailCommentsCount = thumbnailElement.querySelector('.picture__comments');
    const thumbnailLikesCount = thumbnailElement.querySelector('.picture__likes');

    thumbnailElementImg.src = photosList[i].url;
    thumbnailElementImg.alt = photosList[i].description;
    thumbnailCommentsCount.textContent = photosList[i].comments.length;
    thumbnailLikesCount.textContent = photosList[i].likes;

    photosThumbnailsFragment.appendChild(thumbnailElement);

    i++;
  }

  documentThumbnailsPictures.appendChild(photosThumbnailsFragment);
};

export {createThumbnails};
