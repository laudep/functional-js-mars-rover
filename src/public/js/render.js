export const render = async (root, state) => {
    const {
        menu,
        body
    } = App(state);
    root.innerHTML = body;
    document.getElementById("menu").innerHTML = menu;
};

const createParagraph = (text) => `<p>${text}</p>`;

const createMenuItem = (rover, isSelected) =>
    `<li><a href='#' class="rover-header${isSelected ? " selected" : ""}" id='${
    rover.name
  }'>${rover.name}</a></li>`;

const createMenuItems = (rovers, selectedRoverName) =>
    rovers.reduce((menuItems, rover) => {
        const isSelected = rover.name === selectedRoverName;
        menuItems.push(createMenuItem(rover, isSelected));
        return menuItems;
    }, []);

const createMenu = (rovers, selectedRoverName) =>
    `<ul class='menu'>${createMenuItems(rovers, selectedRoverName).join("")}</ul>`;


const createTitle = selectedRoverName => createParagraph(`<h1>${selectedRoverName ? selectedRoverName : 'Please select a rover'}</h1>`);



const createRoverPhoto = url =>
    `<img class="rover-image" src="${url}"/>`;

const createRoverInfo = ({
    selectedRoverName,
    rovers
}) => {
    if (!selectedRoverName) {
        return '';
    }

    const rover = rovers.find(rover => rover.name === selectedRoverName);
    if (!rover) {
        return;
    }

    const photos = rover.photos || [];

    return `<ul><li>Launch Date:${rover.launch_date}</li><li>Landing Date:${rover.landing_date}</li><li>Status: ${rover.status}</li></ul>${photos.map(photo => createRoverPhoto(photo.img_src))}`
}
const createBody = (state) => {
    const title = createTitle(state.selectedRoverName);
    const roverInfo = createRoverInfo(state);
    return title + roverInfo;
};

// create content
const App = (state) => {
    const {
        rovers,
        selectedRoverName
    } = state;

    const menu = createMenu(rovers, selectedRoverName);
    const body = createBody(state);

    return {
        menu,
        body
    };
};