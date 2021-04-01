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

var $h1NewAndEditEntry = document.querySelector('#new-edit-entry');

$formEnterNew.addEventListener('submit', function () {
  event.preventDefault();
  if ($h1NewAndEditEntry.textContent === 'Edit Entry') {
    data.entries[data.entries.length - data.editing.entryId].title = $formEnterNew.elements.title.value;
    data.entries[data.entries.length - data.editing.entryId].url = $formEnterNew.elements.url.value;
    data.entries[data.entries.length - data.editing.entryId].notes = $formEnterNew.elements.notes.value;
    var $liList = $ul.querySelectorAll('li');
    $liList[data.entries.length - data.editing.entryId].replaceWith(addEntry(data.editing));
    $h1NewAndEditEntry.textContent = 'New Entry';
  } else {
    var formObject = {};
    formObject.title = $formEnterNew.elements.title.value;
    formObject.url = $formEnterNew.elements.url.value;
    formObject.notes = $formEnterNew.elements.notes.value;
    formObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formObject);

    $ul.prepend(addEntry(formObject));
  }
  $newImgURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formEnterNew.reset();
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
  $li.setAttribute('data-entry-id', entry.entryId);
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
  if (event.target.innerText === 'NEW') {
    $newImgURL.setAttribute('src', 'images/placeholder-image-square.jpg');
    $formEnterNew.reset();
    $h1NewAndEditEntry.textContent = 'New Entry';
  }
});

$ul.addEventListener('click', function (event) {
  if (event.target.nodeName !== 'I') {
    return;
  }
  changeView('entry-form');
  $h1NewAndEditEntry.textContent = 'Edit Entry';
  var $liEntryID = event.path[3].getAttribute('data-entry-id');
  data.editing = data.entries[data.entries.length - Number($liEntryID)];
  $formEnterNew.elements.title.value = data.editing.title;
  $formEnterNew.elements.url.value = data.editing.url;
  $formEnterNew.elements.notes.value = data.editing.notes;
  $newImgURL.setAttribute('src', $formEnterNew.elements.url.value);
});
