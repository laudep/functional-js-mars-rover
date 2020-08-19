import "core-js/stable";
import "regenerator-runtime/runtime";
import 'bootstrap';
import index from '../css/index.scss';
import {
  render
} from './render'
import Api from './api'

let store = {
  user: {
    name: "Student"
  },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRoverName: "",
};


// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};


// ------------------------------------------------------  COMPONENTS

const photos = Api.getPhotos("Opportunity")
  .then(res => {
    debugger;
    console.log(res)
  });

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  Api.getRovers().then((rovers) => {
    updateStore(store, {
      rovers: rovers
    });
  });
});

const handleMenuClick = (event) => {
  const element = event.target;
  const selectedRoverName = element.id;

  const selectedRover = store.rovers.find(rover => rover.name === selectedRoverName);

  const selectionChanged =
    element.className === "rover-header" &&
    selectedRoverName !== store.selectedRoverName;
  if (selectionChanged) {
    updateStore(store, {
      selectedRoverName: selectedRoverName
    });

    if (selectedRover && !selectedRover.photos)
      Api.getPhotos(selectedRoverName)
      .then(photos => selectedRover.photos = photos);
  }
};

document.getElementById("menu").addEventListener("click", handleMenuClick);