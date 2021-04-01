/* global data */
/* exported data */

var $formEnterNew = document.querySelector('.new-entry');
var $newImgURL = $formEnterNew.querySelector('img');
var $ul = document.querySelector('ul');

$formEnterNew.addEventListener('input', function () {
  event.preventDefault();
  var $inputURL = $formEnterNew.elements.url.value;
  $newImgURL.setAttribute('src', $inputURL);
});

var $views = document.querySelectorAll('.view');
var $noEntriesDiv = document.querySelector('#no-entries-prompt');

function changeView(dataView) {
  if (data.entries.length === 0) {
    $ul.className = 'hidden';
    $noEntriesDiv.className = '';
  } else {
    $ul.className = '';
    $noEntriesDiv.className = 'hidden';
  }
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === dataView) {
      $views[i].className = 'row view';
    } else {
      $views[i].className = 'row view hidden';
    }
  }
}

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
  $ul.prepend(addEntry(formObject));
  changeView('entries');
});

function addEntry(entry) {
  var $li = document.createElement('li');
  $li.classList.add('row');
  var $divImg = document.createElement('div');
  $divImg.classList.add('column-half', 'new-image');
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  $img.setAttribute('alt', entry.title);
  $divImg.appendChild($img);
  $li.appendChild($divImg);
  var $divTitleAndNotes = document.createElement('div');
  $divTitleAndNotes.classList.add('column-half');
  var $divTitle = document.createElement('div');
  $divTitle.setAttribute('class', 'entry-title');
  var $h2Title = document.createElement('h2');
  $h2Title.classList.add('font');
  $h2Title.textContent = entry.title;
  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pen');
  $divTitle.appendChild($h2Title);
  $divTitle.appendChild($icon);
  $divTitleAndNotes.appendChild($divTitle);
  var $divNotes = document.createElement('div');
  var $pNotes = document.createElement('p');
  $pNotes.classList.add('font');
  $pNotes.textContent = entry.notes;
  $divNotes.appendChild($pNotes);
  $divTitleAndNotes.appendChild($divNotes);
  $li.appendChild($divTitleAndNotes);
  $li.setAttribute('data-view', 'data-entry-id');
  return $li;
}

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(addEntry(data.entries[i]));
  }
});

document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('view-changer')) {
    return;
  }
  changeView(event.target.getAttribute('data-view'));
});
