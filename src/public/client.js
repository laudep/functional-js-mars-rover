let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
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
const createMenuItem = (rover) =>
  `<li><a href='#' id='${rover.name}'>${rover.name}</a></li>`;

const createMenuItems = (rovers) =>
  rovers.reduce((menuItems, rover) => {
    menuItems.push(createMenuItem(rover));
    return menuItems;
  }, []);

const createMenu = (rovers) =>
  `<ul class='menu'>${createMenuItems(rovers).join("")}</ul>`;

const createBody = (state) => {
  if (!state.selectedRover) {
    return createParagraph("Please select a Rover");
  }
};

// create content
const App = (state) => {
  const { rovers, selectedRover } = state;

  const menu = createMenu(rovers);

  const body = createBody(state);

  return { menu, body };
};

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
    return;
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

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
