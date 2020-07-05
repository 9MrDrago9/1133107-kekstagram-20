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
bigPicture.classList.remove('hidden');

var makeBlocksHidden = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * max);
};

var getRandomElement = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

var getComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, AVATAR_NUMBERS) + '.svg',
    message: getRandomElement(COMMENT_MESSAGES),
    name: getRandomElement(AUTHORS)
  };
};

var getComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENT_COUNT; i++) {
    comments.push(getComment());
  }
  return comments;
};

var getPhoto = function (number) {
  return {
    url: 'photos/' + getRandomNumber(1, number) + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: getComments().length
  };
};

var getPhotos = function () {
  var photos = [];
  for (var j = 0; j < PICTURES_COUNT; j++) {
    photos.push(getPhoto(PICTURES_COUNT));
  }
  return photos;
};

var createPictureElement = function (photo) {

  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments;

  return picture;
};

var renderPicture = function () {
  var photoArray = getPhotos();
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

var renderComments = function () {
  var commentArray = getComments();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < commentArray.length; i++) {
    fragment.appendChild(createCommentElement(commentArray[i]));
  }

  commentList.appendChild(fragment);
};

var renderBigPicture = function () {
  var photoData = getPhotos();

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData[0].url;
  bigPicture.querySelector('.likes-count').textContent = photoData[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photoData[0].comments;
  bigPicture.querySelector('.social__caption').textContent = photoData[0].description;

  document.querySelector('body').classList.add('modal-open');
};

renderPicture();
makeBlocksHidden();
renderBigPicture();
renderComments();
