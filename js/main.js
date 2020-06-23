'use strict';

var PICTURE_NUMBERS = 25;
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

var AUTHOR_NAMES = [
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

var DESCRIPTION_PHOTOS = [
  'Красота',
  'Прекрасное мгновение',
  'Чувство',
  'Солнышко',
  'Облочко',
  'Небо',
  'Горы',
  'Чудо'
];

var picturesList = document.querySelector('.pictures');

var randNumber = function (number) {
  return Math.floor(1 + Math.random() * number);
};

var randLikes = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var arrayRandElement = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

var getComments = function () {
  var commentObj = {
    avatar: 'img/avatar-' + randNumber(AVATAR_NUMBERS) + '.svg',
    message: arrayRandElement(COMMENT_MESSAGES),
    name: arrayRandElement(AUTHOR_NAMES)
  };
  return commentObj;
};

var arrComments = [];
for (var i = 0; i < COMMENT_COUNT; i++) {
  arrComments.push(getComments());
}

var getPhoto = function () {
  var photoObj = {
    url: 'photos/' + randNumber(PICTURE_NUMBERS) + '.jpg',
    description: arrayRandElement(DESCRIPTION_PHOTOS),
    likes: randLikes(MIN_LIKES, MAX_LIKES),
    comments: getComments()
  };
  return photoObj;
};

var arrPhotos = [];
for (var j = 0; j < PICTURE_NUMBERS; j++) {
  arrPhotos.push(getPhoto());
}

var renderPicture = function (photo) {
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments;

  return picture;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < arrPhotos.length; k++) {
  fragment.appendChild(renderPicture(arrPhotos[k]));
}

picturesList.appendChild(fragment);
