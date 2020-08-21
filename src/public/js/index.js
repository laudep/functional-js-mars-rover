import "core-js/stable";
import "regenerator-runtime/runtime";

import index from '../css/index.scss';
import { render } from './render'
import Api from './api'
import store from './store.js';
import { ADD_ROVERS, ADD_ROVER_PHOTOS, SET_SELECTED_ROVER } from "./actions/rovers"

const root = document.getElementById("root");

const updateStore = action => store(action, renderApp);

const renderApp = (state) => render(root, state);

const updatePhotos = rover => Api.getPhotos(rover)
  .then(photos =>
    updateStore({
      type: ADD_ROVER_PHOTOS,
      data: {
        roverName: rover,
        photos: photos
      }
    })
  );

const getRovers = Api.getRovers()
  .then(async (rovers) =>
    updateStore({
      type: ADD_ROVERS, data: {
        rovers: rovers
      }
    })
  );

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => getRovers());

const handleMenuClick = (event) => {
  const selectedRoverName = event.target.id;

  const state = updateStore({
    type: SET_SELECTED_ROVER,
    data: {
      roverName: selectedRoverName
    }
  });

  const hasPhotos = !!state.rovers
    .find(rover => rover.name === selectedRoverName).photos;

  if (selectedRoverName && !hasPhotos) {
    updatePhotos(selectedRoverName);
  }
};

document.getElementById("menu").addEventListener("click", handleMenuClick);
