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

$formEnterNew.addEventListener('submit', function () {
  event.preventDefault();
  if (event.submitter.getAttribute('data-view') !== 'saveEntry') {
    return;
  }
  var formObject = {};
  formObject.title = $formEnterNew.elements.title.value;
  formObject.url = $formEnterNew.elements.url.value;
  formObject.notes = $formEnterNew.elements.notes.value;
  formObject.entryId = data.nextEntryId;
  data.nextEntryId++;
});
