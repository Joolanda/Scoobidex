/*!
 * Here comes all Javascript
 * Pokedoki App
 * Date: 2019-11-11
 */
// START of IIFE for Pokedex repository
var pokemonRepository = (function() {
  "use strict";
  var repository = [];
  var apiUrl = "https://dog.ceo/api/breeds/list/all";
  var $modalContainer = document.querySelector("#modal-container");

  //Function to add new Pokemon data
  function add(pokemon) {
    repository.push(pokemon);
  }

  //Function to pull all Pokemon data
  function getAll() {
    return repository;
  }

  //Function to add list for each pokemon object
  function addListItem(pokemon) {
    var $pokemonList = document.querySelector(".pokemon-list");
    var $listItem = document.createElement("li");
    var $button = document.createElement("button");

    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button);
    $button.innerText = pokemon.name;
    $button.classList.add("list-button");
    $listItem.classList.add("buttonstyle");
    $button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function add(name) {
    /*Add Additional Pokemon Attributes To Object Array*/
    repository.push(name);
  }

  function catchAll() {
    /* Function Used To Return Pokedex Object Array*/
    return repository;
  }

  //Function to load pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Function to show a modal with title and text

  function showModal(item) {
    //clear all existing modal content
    $modalContainer.innerHTML = "";
    $modalContainer.classList.add("is-visible");

    var modal = document.createElement("div");
    modal.classList.add("modal");

    // add the new modal content
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    var modalTitle = document.createElement("h1");
    modalTitle.innerText = item.name;
    modalTitle.classList.add("modal-title");

    var modalHeight = document.createElement("p");
    modalHeight.innerText = "Height: " + item.height;
    modalHeight.classList.add("modal-details");

    var modalType = document.createElement("p");
    modalType.classList.add("modal-details");
    modalType.innerText = "Type: " + item.types;

    //Pokemon display image in modal
    var imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = item.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(modalTitle);
    modal.appendChild(modalHeight);
    modal.appendChild(modalType);
    $modalContainer.appendChild(modal);
  }

  function hideModal() {
    var $modalContainer = document.querySelector("#modal-container");
    $modalContainer.classList.remove("is-visible");
  }

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal("Modal title", "This is the modal content!");
  });
  // Hide Modal with escape key
  window.addEventListener("keydown", e => {
    var $modalContainer = document.querySelector("#modal-container");
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

  // Hide Modal by clicking outside of Modal
  $modalContainer.addEventListener("click", e => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

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
// END of IIFE for Pokedex repository

//Creates list of Pokemon with Pokemon's name on the button
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Function to show details of each Pokemon
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function() {
    pokemonRepository.showModal(item);
  });
}
