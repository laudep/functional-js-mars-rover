import { RoverPhoto } from "./RoverPhoto"

const RoverProperty = (name, value) =>
    `<tr>
        <td>${name}:   </td>
        <td>${value}</td>
    </tr>`;

const RoverOverview = (rover) => {
    if (!rover) {
        return '';
    }
    const photos = rover.photos || [];
    return `<table class="rover-overview">
        ${RoverProperty("launch date", rover.launch_date)}
        ${RoverProperty("landing date", rover.landing_date)}
        ${RoverProperty("last photo date", `${rover.max_date} (sol ${rover.max_sol})`)}
        ${RoverProperty("photos taken", rover.total_photos.toLocaleString())}
        ${RoverProperty("status", `${rover.status} ${rover.status === 'active' ? '🚀' : '💤'}`)}
    </table>
    </br >
    ${ photos.map(photo => RoverPhoto(photo))} `
}

export default RoverOverview;