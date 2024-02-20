const VISIBLE_COUNT = 5;

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img');
const bigPictureLikesCount = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const commentsCounter = bigPictureBlock.querySelector('.social__comment-count');
const commentsList = bigPictureBlock.querySelector('.social__comments');
const commentsLoader = bigPictureBlock.querySelector('.comments-loader');
const closeBigPictureButton = bigPictureBlock.querySelector('#picture-cancel');

let arrayComments = [];
let currentCommentsCount = 0;

//отрисовка одного комментария, comment {id, avatar, message, name}
const createComment = (comment) => {
  const newComment = commentsList.querySelector('li').cloneNode(true);

  newComment.querySelector('img').src = comment.avatar;
  newComment.querySelector('img').alt = comment.name;
  newComment.querySelector('p').textContent = comment.message;

  return (newComment);
};

//отрисовка блока комментариев, comments [{id, avatar, message, name}, ]
const renderComments = () => {
  currentCommentsCount += VISIBLE_COUNT;

  if (currentCommentsCount >= arrayComments.length) {
    currentCommentsCount = arrayComments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsCounter.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < currentCommentsCount; i++) {
    const comment = createComment(arrayComments[i]);
    commentsFragment.append(comment);
  }

  commentsCounter.querySelector('.current-comments-count').textContent = currentCommentsCount;
  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);
};

const renderDataComments = (comments) => {
  currentCommentsCount = 0;
  if (comments.length > 0) {
    arrayComments = comments;
    renderComments();
  }
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

const clickCommentsLoader = () => {
  renderComments();
};

//открытие окна, picData {id, url, desc, likes, comments {id, avatar, message, name}}
const openBigPicture = (picData) => {
  bigPictureBlock.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureImg.querySelector('img').src = picData.url;
  bigPictureLikesCount.textContent = picData.likes;
  bigPictureDescription.textContent = picData.description;
  bigPictureCommentsCount.textContent = picData.comments.length;

  renderDataComments(picData.comments);

  closeBigPictureButton.addEventListener('click', closeBigPictureWithButton);
  document.addEventListener('keydown', closeBigPictureWithEscape);
  commentsLoader.addEventListener('click', clickCommentsLoader);
};

//закрытие окна изображения
function closeBigPicture () {
  bigPictureBlock.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', closeBigPictureWithEscape);
  closeBigPictureButton.removeEventListener('click', closeBigPictureWithButton);
  commentsLoader.removeEventListener('click', clickCommentsLoader);
}

export {openBigPicture};
