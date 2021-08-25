/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section[data-nav]');
const navMenu = document.getElementById('navbar__list');
const navSectionTitles = [];
const fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function lowerCaseRemoveSpace (word) {
    return word.split(" ").join('').toLowerCase();
}


function removeActiveClass(element) {
   element.classList.remove('active');
}

function addActiveClass(element) {
    element.classList.add('active');
}

// check to see if an elemnt now in viewport
function isViewed(element) {
    return element.getBoundingClientRect().y < (window.innerHeight / 2) && 
        element.getBoundingClientRect().y + element.getBoundingClientRect().height > window.innerHeight / 2;

}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/



// Build the menu



for (let i = 0; i < sections.length; i++) {
    navSectionTitles.push(sections[i].dataset.nav);
}

for (let i = 0; i < navSectionTitles.length; i++) {
    const listElement = document.createElement('li');
    listElement.innerHTML = `<a class="menu__link" href="#${lowerCaseRemoveSpace(navSectionTitles[i])}">${navSectionTitles[i]}</a>`;
    fragment.appendChild(listElement);
}

navMenu.appendChild(fragment);




// Handle click menu event
navMenu.addEventListener('click', function (e) {
    
    if (e.target.nodeName === 'A') {
        e.preventDefault();
        const section = document.getElementById(e.target.getAttribute('href').substring(1));
        section.scrollIntoView({ behavior: 'smooth' });
    }
});




// Handle scroll event
window.addEventListener('scroll', function () {
    for (let i = 0, ii = sections.length; i < ii; i++) {
        const navMenuItem = navMenu.querySelector(`a[href="#${sections[i].id}"]`);
        const currentSection = sections[i];
        const clientRect = currentSection.getBoundingClientRect();


        if (isViewed(currentSection)) {
            addActiveClass(currentSection);
            addActiveClass(navMenuItem);
        } else {
            removeActiveClass(navMenuItem);     // remove active class from menu item
            removeActiveClass(currentSection); // remove active class from the section
        }
    }
});



// responsive mobile menu
const btn = document.getElementById('menu-icon');
btn.addEventListener('click', (e) => {
    const responsive = document.getElementById('navbar__list');
    const toggledElement = document.querySelector('.menu__btn');
    // e.target.classList.toggle('close');
    toggledElement.classList.toggle('close');
    const hasClose = btn.classList.contains('close');
    if (hasClose) {
        responsive.classList.remove('responsive');
    } else {
        responsive.classList.add('responsive');
    }
});