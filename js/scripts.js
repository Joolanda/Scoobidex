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
    var $listItem = $('<li class="list-group-item"></li>');
    var $button = $('<button class="list-button">' + dog.name + '</button>');

    $(dogList).append($listItem);
    $(listItem).append($button);
    $(button).html(dog.name); 
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
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(json) {
      json.results.forEach(function(item) {
          var dog = {
            breeds: item.message,
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
    return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(details) {
        // add the details to the item
        item.imageUrl = details.sprites.front_default;
                                item.types = details.subbreeds;
        item.types = details.types.map(function(dog){
        return dog.subbreed.name;

      }).catch(function(e) {
        console.error(e);
      });
    });
  }

  // Function to show a modal with title and text

  function showModal(item) {
    //clear all existing modal content
    $modalContainer.html('');
    $modalContainer.addClass('is-visible');

    var $modal = $('<div class="modal"></div>');

    // add the new modal content
    var $closeButtonElement = $('<button type="button" class="modal-close">Close</button>');
    $closeButtonElement.on('click', function (hideModal) {
      hideModal()
    });

    var modalTitle = $('h1');
    $modalTitle.html(item.message class='modal');

    var modalType = $('p');
    $modalType.html(item.breeds class='modal');

    //dogbreed display image in modal
    var imageElement = $('img');
    $imageElement.html(item.imageUrl class='modal-img');

    $modal.append($closeButtonElement);
    $modal.append($imageElement);
    $modal.append($modalTitle);
    $modal.append($modalType);
    $modalContainer.append($modal);
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
