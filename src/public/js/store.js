import { Map, fromJS } from 'immutable';
import { ADD_ROVERS, ADD_ROVER_PHOTOS, SET_SELECTED_ROVER } from "./actions/rovers"

let state = Map({
    rovers: [],
    selectedRoverName: ""
});


const store = (action, callback) => {
    const getRoverIndex = (rovers, name) => rovers
        .findIndex(rover => rover.get('name') === name);

    switch (action.type) {
        case (ADD_ROVERS):
            state = state.set('rovers', fromJS(action.data.rovers));
            break;
        case (ADD_ROVER_PHOTOS):
            const { roverName, photos } = action.data;
            state = state.set('selectedRoverName', roverName);

            const rovers = state.get('rovers');
            const selectedIndex = getRoverIndex(rovers, roverName);

            state = state.set('rovers', rovers.update(selectedIndex, (rover) => rover.set('photos', photos)));
            break;
        case (SET_SELECTED_ROVER):
            state = state.set('selectedRoverName', action.data.roverName);
            break;
        default:
            break;
    }

    const newStore = state.toJS();

    callback(newStore);
    return newStore;
};

export default store;
