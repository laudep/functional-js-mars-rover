import Menu from "./components/Menu"
import Title from "./components/Title";
import RoverOverview from "./components/RoverOverview"
import { photoClickHandler, modalCloseHandler } from "./components/RoverPhoto"

export const render = async (root, state) => {
    const {
        menu,
        body
    } = App(state);
    root.innerHTML = body;
    document.getElementById("menu").innerHTML = menu;
    initImageClickHandlers();
};

const App = (state) => {
    const {
        rovers,
        selectedRoverName
    } = state;

    const menu = Menu(rovers, selectedRoverName);
    const body = createBody(state);

    return {
        menu,
        body
    };
};


const createBody = (state) => {
    const { rovers, selectedRoverName } = state;
    const rover = selectedRoverName
        ? rovers.find(rover => rover.name === selectedRoverName)
        : null;

    const title = Title(selectedRoverName);
    const roverOverview = RoverOverview(rover);
    return title + roverOverview;
};


const initImageClickHandlers = () => {
    const modals = [...document.getElementsByClassName("modal")];

    for (const modal of modals) {
        const photoId = modal.id.replace("modal_", "");
        const sourceImg = document.getElementById(`img_${photoId}`);
        const closeButton = document.getElementById(`close_${photoId}`);

        if (sourceImg) {
            sourceImg.addEventListener("click", photoClickHandler);
        }

        if (closeButton) {
            closeButton.addEventListener("click", modalCloseHandler);
        }
        // allow for closing the the modal by clicking on the background
        modal.addEventListener("click", modalCloseHandler);
    }
}
