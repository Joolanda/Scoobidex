/*!
 * Here comes all Javascript
 * Scoobidex App - rewritten pokedex comes here
 * Date: 2020-14-02
 */
// START of IIFE for Scoobidex repository
var dogRepository = (function() {
  "use strict";
  var repository = [];
  var apiUrl = "https://dog.ceo/api/breeds/list/all";
  var $modalContainer = $('#modal-container');
  var $dogList = $('ul');

  //Function to add new hound data
  function add(dog) {
    repository.push(dog);
  }

  //Function to pull all dog data
  function getAll() {
    return repository;
  }

  //Function to add list for each dog object
  function addListItem(dog) {
    var $dogList = $('.dog-list');
    var $listItem = $('<li></li>');
    var $button = $(<div class='list-button'>);

    $('houndList').append($listItem);
    $('listItem').append($button);
    $button.innerText = dog.message; // take a better look at this..rewrite
    $button.classList.add('list-button'); // take a better look at this..rewrite
    $listItem.classList.add('buttonstyle'); // take a better look at this..rewrite
    $button.on('click', function() {
      showDetails(dog);
    });
  }

  function add(name) {
    /*Add Additional dog Attributes To Object Array*/
    repository.push(name);
  }

  function catchAll() {
    /* Function Used To Return Scoobidex Object Array*/
    return repository;
  }

  //Function to load dog list from API - in jQuery instead of fetch
  // ...return fetch(apiUrl).then(function (response)... forEach(function (item) etcetera
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(item) {
      $.each(item.results, function(index, item) {
          var dog = {
            name: item.message,
            detailsUrl: item.url
          };
          add(dog);
        });
      }).catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, {dataType: 'json'}).then(function(details) {
        // add the details to the item
        item.imageUrl = details.sprites.front_default;
                                item.types = details.subbreeds;
        item.types = details.types.map(function(dog){
        return dog.subbreed.name;
      });

      }).catch(function(e) {
        console.error(e);
      });
  }

  // Function to show a modal with title and text

  function showModal(item) {
    //clear all existing modal content
    $modalContainer.innerHTML = '';
    $modalContainer.classList.add('is-visible');

    var $modal = $('<div class='modal'></div>');

    // add the new modal content
    var $closeButtonElement = $('<button='modal-close'>Close</button>');
    $closeButtonElement.on('click', function(hideModal);

    var modalTitle = $('h1');
    $modalTitle.html(item.message class='modal-title')

    var modalType = $('p');
    $modalType.html(item.breeds class='modal-details');

    //dogbreed display image in modal
    var imageElement = $('img');
    $imageElement.html(item.imageUrl class='modal-img');

    $modal.append($imageElement);
    $modal.append($modalTitle);
    $modal.append($modalType);
    $$modalContainer.append($modal);
  }

  function hideModal() {
    var $modalContainer = $('#modal-container' removeClass('is-visible'));
  }
    var $modalContainer.on('click', function(showModal) => {
    ('Modal title', "This is the modal content!");
  });

  //Function to show details of each dog breed
  function showDetails(item) {
    dogRepository.loadDetails(item).then(function() {
      dogRepository.showModal(item);
    });
  }

  return {
    /*Return All Previous Function In Order To Be Available Outside Of IIFE */
    add: add,
    catchAll: catchAll,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
// END of IIFE for Scoobidex repository

//Creates list of Dogs with hound breeds name on the button
dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
