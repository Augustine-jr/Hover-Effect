// Select the element with the class 'hover_div' and store it in the hoverDiv variable
const hoverDiv = document.querySelector('.hover_div');

// Select the element with the class 'menu' and store it in the menu variable
const menu = document.querySelector('.menu');

// Select all <li> elements inside the document, convert the NodeList to an array using the spread operator,
// and store it in the links variable for easy manipulation
const links = [...document.querySelectorAll('li')];

// Define a string of uppercase letters and split it into an array of individual characters.
// The split('') method breaks the string into an array where each character becomes an array element.
const randomLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

// Add an event listener to the 'menu' element for the 'mouseenter' event
menu.addEventListener('mouseenter', () => {
  // When the mouse enters the 'menu', add the 'active' class to the hoverDiv
  hoverDiv.classList.add('active');
});

// Add an event listener to the 'menu' element for the 'mouseleave' event
menu.addEventListener('mouseleave', () => {
  // When the mouse leaves the 'menu', remove the 'active' class from the hoverDiv
  hoverDiv.classList.remove('active');
});

// Define a class named 'Link' to represent each menu item link
class Link {
  constructor(element, index) {
    this.element = element;           // Store the HTML element (the <li> or link element)
    this.index = index;               // Store the index of the link in the 'links' array
    this.originalString = element.innerText;  // Store the original inner text of the link
    this.randomString = this.element.innerText.split(''); // Store a random string of characters to animate the link
    this.frame = 0;                   // Store the current frame of the animation
    this.addHoverEvent();             // Call the 'addHoverEvent' method to add event listeners to the link
  }

  addHoverEvent() {
    this.element.addEventListener('mouseenter', () => {
      console.log(this.index);
      hoverDiv.style.transform = `translateX(${this.index * 100}%)`;
    });
  }
}

// Iterate over each link in the 'links' array, creating a new instance of the 'Link' class for each one
links.forEach((link, index) => {
  new Link(link, index);  // Pass the link and its index to the 'Link' class constructor
});


