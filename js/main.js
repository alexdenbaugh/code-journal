/* global data */
/* exported data */

var $formEnterNew = document.querySelector('.new-entry');
var $newImgURL = $formEnterNew.querySelector('img');

$formEnterNew.addEventListener('input', function () {
  event.preventDefault();
  if (event.target.getAttribute('data-view') !== 'newURL') {
    return;
  }
  var $inputURL = $formEnterNew.elements.url.value;
  $newImgURL.setAttribute('src', $inputURL);
});
