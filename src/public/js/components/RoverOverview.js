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
    const lastPhotoText = `${rover.max_date} (sol ${rover.max_sol})`;
    const statusText = `${rover.status} ${rover.status === 'active' ? '🚀' : '💤'}`;
    return `<table class="rover-overview">
        ${Property("launch date", rover.launch_date)}
        ${Property("landing date", rover.landing_date)}
        ${Property("last photo date", lastPhotoText)}
        ${Property("photos taken", rover.total_photos.toLocaleString())}
        ${Property("status", statusText)}
    </table>
    </br >
    ${ photos.map(photo => RoverPhoto(photo))} `
}

export default RoverOverview;
