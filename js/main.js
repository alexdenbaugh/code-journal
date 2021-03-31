/* global data */
/* exported data */

var $formEnterNew = document.querySelector('.new-entry');
var $newImgURL = $formEnterNew.querySelector('img');

$formEnterNew.addEventListener('input', function () {
  event.preventDefault();
  var $inputURL = $formEnterNew.elements.url.value;
  $newImgURL.setAttribute('src', $inputURL);
});

$formEnterNew.addEventListener('submit', function () {
  event.preventDefault();
  var formObject = {};
  formObject.title = $formEnterNew.elements.title.value;
  formObject.url = $formEnterNew.elements.url.value;
  formObject.notes = $formEnterNew.elements.notes.value;
  formObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $newImgURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formEnterNew.reset();
});

// function addEntry(entry) {
//   var $li = document.createElement('li');
//   $li.classList.add('row');
//   var $divImg = document.createElement('div');
//   $divImg.classList.add('column-half', 'new-image');
//   var $img = document.createElement('img');
//   $img.setAttribute('src', entry.url);
//   $img.setAttribute('alt', entry.title);
//   $divImg.appendChild($img);
//   $li.appendChild($divImg)
//   var $divTitleAndNotes = document.createElement('div');
//   $divTitleAndNotes.classList.add('column-half');
//   var $divTitle = document.createElement('div');
//   var $h2Title = document.createElement('h2');
//   $h2Title.classList.add('font');
//   $h2Title.textContent = entry.title;
//   $divTitle.appendChild($h2Title)
//   $divTitleAndNotes.appendChild($divTitle)
//   var $divNotes = document.createElement('div');
//   var $pNotes = document.createElement('p');
//   $pNotes.classList.add('font');
//   $pNotes.textContent = entry.notes;
//   $divNotes.appendChild($pNotes);
//   $divTitleAndNotes.appendChild($divNotes)
//   $li.appendChild($divTitleAndNotes)
//   return $li;
// }
