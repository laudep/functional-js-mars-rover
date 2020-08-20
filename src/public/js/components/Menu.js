const MenuItem = (rover, isSelected) =>
    `<li><a href='#' class="rover-header${isSelected ? " selected" : ""}" id='${
    rover.name
  }'>${rover.name}</a></li>`;

const MenuItems = (rovers, selectedRoverName) =>
    rovers.reduce((menuItems, rover) => {
        const isSelected = rover.name === selectedRoverName;
        menuItems.push(MenuItem(rover, isSelected));
        return menuItems;
    }, []);

const Menu = (rovers, selectedRoverName) =>
    `<ul class='menu'>${MenuItems(rovers, selectedRoverName).join("")}</ul>`;

export default Menu;
