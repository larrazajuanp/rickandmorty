const closeMenu = document.getElementById('close-menu');
const mainMenu = document.getElementById('main-menu');
const hamburgerMenu = document.getElementById('hamburger-menu')

const closeHambMenu = (e) => {
    const closeElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    closeElement.remove();
}

closeMenu.addEventListener('click', closeHambMenu)

const openHambMenu = () => {
    mainMenu ? mainMenu : null;
}

hamburgerMenu.addEventListener('click', openHambMenu)

