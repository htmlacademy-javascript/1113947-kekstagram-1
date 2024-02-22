const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img');
const bigPictureLikesCount = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const commentsCounter = bigPictureBlock.querySelector('.social__comment-count');
const commentsList = bigPictureBlock.querySelector('.social__comments');
const commentsLoader = bigPictureBlock.querySelector('.comments-loader');
const closeBigPictureButton = bigPictureBlock.querySelector('#picture-cancel');

//отрисовка одного комментария, comment {id, avatar, message, name}
const createComment = (comment) => {
  const newComment = commentsList.querySelector('li').cloneNode(true);

  newComment.querySelector('img').src = comment.avatar;
  newComment.querySelector('img').alt = comment.name;
  newComment.querySelector('p').textContent = comment.message;

  return (newComment);
};

//отрисовка блока комментариев, comments [{id, avatar, message, name}, ]
const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  for (const element of comments) {
    const comment = createComment(element);
    commentsFragment.append(comment);
  }

  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);
};

//закрытие через ESC
const closeBigPictureWithEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

//закрытие через кнопку
const closeBigPictureWithButton = () => {
  closeBigPicture();
};

//открытие окна, picData {id, url, desc, likes, comments {id, avatar, message, name}}
const openBigPicture = (picData) => {
  bigPictureBlock.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureImg.querySelector('img').src = picData.url;
  bigPictureLikesCount.textContent = picData.likes;
  bigPictureDescription.textContent = picData.description;
  bigPictureCommentsCount.textContent = picData.comments.length;

  renderComments(picData.comments);

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  closeBigPictureButton.addEventListener('click', closeBigPictureWithButton);
  document.addEventListener('keydown', closeBigPictureWithEscape);
};

//закрытие окна изображения
function closeBigPicture () {
  bigPictureBlock.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', closeBigPictureWithEscape);
  closeBigPictureButton.removeEventListener('click', closeBigPictureWithButton);
}

export {openBigPicture};
