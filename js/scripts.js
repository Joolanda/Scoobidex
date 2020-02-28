/*!
 * Here comes all Javascript
 * Scoobidex App - rewritten pokedex comes here
 * Date: 2020-14-02
 */
// START of IIFE for Scoobidex repository
var dogRepository = (function() {
  var repository = [];
  var apiUrl = "https://dog.ceo/api/breeds/list/all";
  var $modalContainer = $("#modal-container");

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
    var $dogList = $(".dog-list");
    var $listItem = $('<li class="buttonstyle"></li>');
    var $button = $('<button class="list-button">' + dog.breeds + "</button>");

    $dogList.append($listItem);
    $listItem.append($button);
    $button.on("click", function(event) {
      showDetails(dog);
    });
  }

  function add(breeds) {
    /*Add Additional dog Attributes To Object Array*/
    repository.push(breeds);
  }

  function catchAll() {
    /* Function Used To Return Scoobidex Object Array*/
    return repository;
  }

  //Function to load dog list from API - in jQuery instead of fetch
  // ...return fetch(apiUrl).then(function (response)... forEach(function (item) etcetera
  function loadList() {
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function(item) {
        $.each(item.results, function(index, item) {
          var dog = {
            name: item.message,
            detailsUrl: item.url
          };
          add(dog);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
            return responseJSON;
            }).then(function(details) {
        // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
        //item.types = details.subbreeds;
        //item.types = details.types
        
        //  .map(function(dog) {
        //    return dog.subbreed.name;
    
        // loop for each of the pokemon types:
            item.types = Object.keys(details.types);
            })
            .catch(function(e) {
            console.error(e);
            })
    }
    
  // Function to show a modal with title and text

  function showModal(item) {
    //clear all existing modal content
    $modalContainer.empty();
    $modalContainer.addClass("is-visible");

    var modal = $('<div class="modal"></div>');

    // add the new modal content
    var closeButtonElement = $('<button class="modal-close">Close</button>');
    closeButtonElement.on("click", hideModal);

    //var modalTitle = $("<h1>" + item.message + "</h1>");
    var modalTitle = $('<h1 class="modal-title">' + item.name + "</h1>");

    //var modalType = $("<p>" + "Type : " + item.breeds + "</p>");
    var modalType = $(
      '<p class="modal-details">' + "Type : " + item.types + "</p>"
    );

    //dogbreed display image in modal
    var imageElement = $('<img class="modal-img">');
    imageElement.attr("src", item.imageUrl);

    modal.append(closeButtonElement);
    modal.append(imageElement);
    modal.append(modalTitle);
    modal.append(modalType);
    $modalContainer.append(modal);
  }

function hideModal() {
    var $modalContainer = $("#modal-container");
    $modalContainer.removeClass("is-visible");
  }

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
