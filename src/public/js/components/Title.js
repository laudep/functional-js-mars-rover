const NASA_INFO_URL = "https://mars.nasa.gov/mer/";
const NASA_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg";

const Title = selectedRoverName =>
    `<div class="title">
        <a href="${NASA_INFO_URL}">
            <img src="${NASA_LOGO_URL}"
                 alt="NASA logo"
                 title="Click for more info on the NASA Mars missions"/>
        </a>
        <h1>Mars Rover Dashboard</h1>
    </div>
    <h2>${selectedRoverName
            ? selectedRoverName
            : 'Please select a rover'}</h2>`;

export default Title;
