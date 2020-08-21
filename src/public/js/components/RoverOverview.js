import { RoverPhoto } from "./RoverPhoto"

const Property = (name, value) =>
    `<tr>
        <td>${name}:   </td>
        <td>${value}</td>
    </tr>`;

const RoverOverview = (rover) => {
    if (!rover) {
        return '';
    }
    const photos = rover.photos || [];
    const lastPhotoText = `${rover.maxDate} (sol ${rover.maxSol})`;
    const statusText = `${rover.status} ${rover.status === 'active' ? '🚀' : '💤'}`;
    return `<table class="rover-overview">
        ${Property("launch date", rover.launchDate)}
        ${Property("landing date", rover.landingDate)}
        ${Property("last photo date", lastPhotoText)}
        ${Property("photos taken", rover.totalPhotos.toLocaleString())}
        ${Property("status", statusText)}
    </table>
    </br >
    ${ photos.map(photo => RoverPhoto(photo))} `
}

export default RoverOverview;
