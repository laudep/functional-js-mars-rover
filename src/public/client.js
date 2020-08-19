let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRover: "",
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  const { menu, body } = App(state);
  root.innerHTML = body;
  document.getElementById("menu").innerHTML = menu;
};

const createParagraph = (text) => `<p>${text}</p>`;
const createMenuItem = (rover, isSelected) =>
  `<li><a href='#' class="rover-header${isSelected ? " selected" : ""}" id='${
    rover.name
  }'>${rover.name}</a></li>`;

const createMenuItems = (rovers, selectedRover) =>
  rovers.reduce((menuItems, rover) => {
    const isSelected = rover.name === selectedRover;
    menuItems.push(createMenuItem(rover, isSelected));
    return menuItems;
  }, []);

const createMenu = (rovers, selectedRover) =>
  `<ul class='menu'>${createMenuItems(rovers, selectedRover).join("")}</ul>`;

const createBody = (state) => {
  if (!state.selectedRover) {
    return createParagraph("Please select a Rover");
  } else {
    return `Selected rover: ${state.selectedRover}`;
  }
};

// create content
const App = (state) => {
  const { rovers, selectedRover } = state;

  const menu = createMenu(rovers, selectedRover);

  const body = createBody(state);

  return { menu, body };
};

// ------------------------------------------------------  COMPONENTS

// ------------------------------------------------------  API CALLS

const BASE_URL = "http://localhost:3001";

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`${BASE_URL}/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));
};

const getRovers = () => fetch(`${BASE_URL}/rovers`).then((res) => res.json());

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  getRovers().then((rovers) => {
    updateStore(store, { rovers: rovers });
  });
});

const handleMenuClick = (event) => {
  const element = event.target;
  const selectedRover = element.id;

  const selectionChanged =
    element.className === "rover-header" &&
    selectedRover !== store.selectedRover;
  if (selectionChanged) {
    updateStore(store, { selectedRover: selectedRover });
  }
};

document.getElementById("menu").addEventListener("click", handleMenuClick);
