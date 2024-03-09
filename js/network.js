const SERVER_ADRESS = 'https://28.javascript.htmlacademy.pro/kekstagram';

let notificationVisible = false;

//уведомление ошибки при получении данных с сервера
const showGetError = () => {
  const errorNotification = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const button = errorNotification.querySelector('.error__button');
  const closeWithEsc = (evt) => {
    if (evt.key === 'Escape') {
      removeNotification();
    }
  };
  errorNotification.querySelector('.error__title').textContent = 'Ошибка загрузки данных с сервера';
  button.textContent = 'Закрыть';
  button.addEventListener('click', removeNotification);
  document.addEventListener('keydown', closeWithEsc);
  document.body.appendChild(errorNotification);

  function removeNotification () {
    errorNotification.remove();
    button.addEventListener('click', removeNotification);
    document.removeEventListener('keydown', closeWithEsc);
  }
};

//получаю данные с сервера
const getData = () =>
  fetch(`${SERVER_ADRESS}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return (response);
    })
    .then((response) => response.json())
    .catch(() => showGetError());

//показываю результат отправки формы
const showStatus = (status) => {
  const notification = document.querySelector(`#${status}`).content.querySelector(`.${status}`).cloneNode(true);
  const button = notification.querySelector(`.${status}__button`);
  notificationVisible = true;
  //закрытие нотификата через esc
  const closeWithEsc = (evt) => {
    if (evt.key === 'Escape') {
      removeNotification();
    }
  };
  //закрытие нотификата кликом по окружающей области
  const clickForClose = (evt) => {
    if (evt.target !== notification.querySelector(`.${status}__inner`) &&
        evt.target !== notification.querySelector(`.${status}__title`) &&
        evt.target !== notification.querySelector(`.${status}__button`)) {
      removeNotification();
    }
  };
  document.body.appendChild(notification);
  button.addEventListener('click', removeNotification);
  document.addEventListener('keydown', closeWithEsc);
  document.addEventListener('click', clickForClose);
  function removeNotification () {
    notification.remove();
    notificationVisible = false;
    button.addEventListener('click', removeNotification);
    document.removeEventListener('keydown', closeWithEsc);
    document.removeEventListener('click', clickForClose);
  }
};

//отправляю данные формы
const sendData = (formData) =>
  fetch(SERVER_ADRESS,
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return (response);
    })
    .then((response) => {
      showStatus('success');
      return (response.json());
    })
    .catch((err) => {
      showStatus('error');
      throw new Error(`Произошла ошибка: ${err.message}`);
    });

//штучка, не дающая закрыть окно редактирования изображения,
//когда срабатывает событие закрытия окна showStatus через esc
const notificationVisibleStatus = () => notificationVisible;

export {getData, sendData, notificationVisibleStatus};
