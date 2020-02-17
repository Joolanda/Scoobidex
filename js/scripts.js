/*!
 * Here comes all Javascript
 * Scoobidex App - rewritten pokedex comes here
 * Date: 2020-14-02
 */
// START of IIFE for Scoobidex repository
var houndRepository = (function() {
  "use strict";
  var repository = [];
  var apiUrl = "https://dog.ceo/api/breeds/list/all";
  var $modalContainer = document.querySelector("#modal-container");

  //Function to add new hound data
  function add(hound) {
    repository.push(hound);
  }

  //Function to pull all hound data
  function getAll() {
    return repository;
  }

  //Function to add list for each Hound object
  function addListItem(hound) {
    var $houndList = document.querySelector(".hound-list");
    var $listItem = document.createElement("li");
    var $button = document.createElement("button");

    $houndList.appendChild($listItem);
    $listItem.appendChild($button);
    $button.innerText = hound.name;
    $button.classList.add("list-button");
    $listItem.classList.add("buttonstyle");
    $button.addEventListener("click", function(event) {
      showDetails(hound);
    });
  }

  function add(name) {
    /*Add Additional Hound Attributes To Object Array*/
    repository.push(name);
  }

  function catchAll() {
    /* Function Used To Return Scoobidex Object Array*/
    return repository;
  }

  //Function to load hound list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var hound = {
            name: item.name,
            detailsUrl: item.url
          };
          add(hound);
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

    var modalType = document.createElement("p");
    modalType.classList.add("modal-details");
    modalType.innerText = "sub-breed: " + item.types;

    //Hound display image in modal
    var imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = item.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(modalTitle);
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
// END of IIFE for Scoobidex repository

//Creates list of Dogs with hound breeds name on the button
houndRepository.loadList().then(function() {
  houndRepository.getAll().forEach(function(hound) {
    houndRepository.addListItem(hound);
  });
});

//Function to show details of each hound breed
function showDetails(item) {
  houndRepository.loadDetails(item).then(function() {
    houndRepository.showModal(item);
  });
}
