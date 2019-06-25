// set up the movie registry by wrapping in an IIFE
var dogRepository = (function () {
  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';

  function add(dog) {
    // verify what is being added is an object
    var isObject = 0;
    if (typeof dog === 'object') {
      isObject = 1;
    }

    // verify the object has the name key
    var typeOK = 1;
    if (dog.hasOwnProperty('name')) {
      typeOK = 1;
    } else {
      typeOK = 0;
    }

    // if type and keys are correct, add pokemon to repository
    if (isObject && typeOK) {
      repository.push(dog);
    }
  }

  // function that returns the entire dog repository
  function getAll() {
    console.log(repository);
    return repository;
  }

  // add a dog repository to the main page as a button with pokemon name
  function addListItem(dog_item) {
    console.log("in addListItem")
      // create list element
      var newListElement = document.createElement('li');
      newListElement.classList.add('dog-list__item');
      newListElement.innerText = '';

      // create button element and add name to innerText
      var newButtonElement = document.createElement('button');
      newButtonElement.innerText = dog_item.name;

      // append button to list element
      newListElement.appendChild(newButtonElement);

      //select the unordered list in the DOM and append list item
      var $dogList = document.querySelector('.dog-list');
      $dogList.appendChild(newListElement);

      // add click event handler to the new button
      // newButtonElement.addEventListener('click', function(event) {
      //   showDetails(dog_item);
      // })
  }

  function loadList() {
    $.ajax(apiUrl, { dataType: 'json' }).done(function(data) {
      console.log("success");
      var keys = Object.keys(data.message);
      for (var i in keys) {
        var dog = {
          name: keys[i]
        };
        add(dog);
      }
    }).fail(function() {
      console.log("fail");
    })
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList
  };
})();

// loop through the repository and add a button to the main page
// each button has the pokemon's name on it
dogRepository.loadList().then(function() {
  dogRepository.getAll().forEach(function(dog) {
    dogRepository.addListItem(dog);
  });
});
