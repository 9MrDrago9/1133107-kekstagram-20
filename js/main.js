'use strict';

var PICTURES_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENT_COUNT = 3;
var AVATAR_NUMBERS = 6;

var COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var AUTHORS = [
  'Цефас',
  'Ева',
  'Таисия',
  'Жаклин',
  'Харита',
  'Йолика',
  'Татьяна',
  'Йоланта',
  'Эдуард',
  'Юлий',
  'Эрик',
  'Закир'
];

var DESCRIPTIONS = [
  'Красота',
  'Прекрасное мгновение',
  'Чувство',
  'Солнышко',
  'Облочко',
  'Небо',
  'Горы',
  'Чудо'
];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var commentList = document.querySelector('.social__comments');
var commentItem = document.querySelector('.social__comment');
var commentsCount = document.querySelector('.social__comment-count');
var commentLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');

var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
};

var hideCommentsCount = function () {
  commentsCount.classList.add('hidden');
};

var hideCommentsLoader = function () {
  commentLoader.classList.add('hidden');
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * max);
};

var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr);
};

var getComment = function (names, comments) {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, AVATAR_NUMBERS) + '.svg',
    message: comments[getRandomElement(comments.length)],
    name: names[getRandomElement(names.length)]
  };
};

var getComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENT_COUNT; i++) {
    comments.push(getComment(AUTHORS, COMMENT_MESSAGES));
  }
  return comments;
};

var getPhoto = function (number, descriptions) {
  return {
    url: 'photos/' + getRandomNumber(1, number) + '.jpg',
    description: descriptions[getRandomElement(descriptions.length)],
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: getComments()
  };
};

var getPhotos = function () {
  var photos = [];
  for (var j = 0; j < PICTURES_COUNT; j++) {
    photos.push(getPhoto(PICTURES_COUNT, DESCRIPTIONS));
  }
  return photos;
};

var photoArray = getPhotos();

var createPictureElement = function (photo) {

  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  return picture;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoArray.length; i++) {
    fragment.appendChild(createPictureElement(photoArray[i]));
  }

  picturesList.appendChild(fragment);
};

var createCommentElement = function (comment) {

  var newComment = commentItem.cloneNode(true);

  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.comments.length; i++) {
    fragment.appendChild(createCommentElement(comments.comments[i]));
  }

  commentList.appendChild(fragment);
};

var renderBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.lenght;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture);

  body.classList.add('modal-open');
};

renderPictures();
showBigPicture();
hideCommentsCount();
hideCommentsLoader();
renderBigPicture(photoArray[0]);
