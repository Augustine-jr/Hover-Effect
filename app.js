// Select the element with the class 'hover_div' and store it in the hoverDiv variable
const hoverDiv = document.querySelector('.hover_div');
// `querySelector` finds the first element in the HTML with the class `hover_div`.
// We store it in the `hoverDiv` variable so we can use it later, like moving the box when you hover.

// Select the element with the class 'menu' and store it in the menu variable
const menu = document.querySelector('.menu');
// Similar to the above, we find the first element with the class `menu` (like a list or navigation) and store it in `menu`.

// Select all <li> elements inside the document, convert the NodeList to an array using the spread operator,
// and store it in the links variable for easy manipulation
const links = [...document.querySelectorAll('.menu li')]; 
// `querySelectorAll` finds all `<li>` elements inside the `menu`.
// We use the spread operator `...` to convert the NodeList (a special type of array) into a regular JavaScript array. This makes it easier to work with later.

// Define a string of uppercase letters and split it into an array of individual characters.
const randomLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
// We create a string with all the uppercase letters (A-Z), then use `.split('')` to turn it into an array, where each letter is an individual element.

// Add an event listener to the 'menu' element for the 'mouseenter' event
menu.addEventListener('mouseenter', () => {
  hoverDiv.classList.add('active');
});
// We listen for when the mouse enters the `menu` (when you hover over it).
// When the mouse enters, the code adds the `active` class to the `hoverDiv`. 
// This could be used to trigger animations or visual changes like moving the box.

// Add an event listener to the 'menu' element for the 'mouseleave' event
menu.addEventListener('mouseleave', () => {
  hoverDiv.classList.remove('active');
});
// This listens for when the mouse leaves the `menu` (when you stop hovering over it).
// When that happens, the `active` class is removed from the `hoverDiv`, undoing whatever changes were triggered when the mouse entered.

// Define a class named 'Link' to represent each menu item link
class Link {
  constructor(element, index) {
    this.element = element;  // Store the HTML element (like the `<li>` or the link itself) 
    this.index = index;  // Store the position of the element in the array (0, 1, 2, etc.)
    this.originalString = element.innerText; // Save the original text of the link
    this.randomString = this.generateRandomString(); // Generate a random string for the animation (we'll scramble the text)
    this.frame = 0;  // This keeps track of how many animation steps we've done
    this.addHoverEvent();  // Call a method to add hover effects to this link
  }

  // Generate a random string of the same length as the original string
  generateRandomString() {
    // For each character in the original string, we pick a random letter from `randomLetters`
    return Array.from(this.originalString, () => randomLetters[Math.floor(Math.random() * randomLetters.length)]);
  }

  // Add hover event listeners to each link
  addHoverEvent() {
    // When the mouse enters the link, the hover box moves to the correct position (based on its index)
    this.element.addEventListener('mouseenter', () => {
      hoverDiv.style.transform = `translateX(${this.index * 100}%)`; // Move the hover box horizontally based on the link's position
      this.animate();  // Start animating the text (making it look scrambled)
    });

    // When the mouse leaves the link, stop the animation and reset everything
    this.element.addEventListener('mouseleave', () => {
      this.frame = 0;  // Reset the animation frame (this stops the animation)
      setTimeout(() => {
        this.frame = 0;  // After 1 second, reset the frame to 0 again just to make sure.
      }, 1000);
    });
  }

  // Animation function to scramble the text
  animate() {
    if (this.frame < 30) {  // If we're still in the animation process (less than 30 steps)
      if (this.frame % 3 === 0) {  // Every 3 frames, scramble the text
        // Generate a new random string of letters and update the text
        this.randomString = this.generateRandomString();
        this.element.innerText = this.randomString.join(''); // Join the array of letters back into a string and show it as the link text
      }
      this.frame++;  // Increase the frame count by 1 (we're moving through the animation)
      requestAnimationFrame(this.animate.bind(this));  // Call this method again to keep animating until the frame count reaches 30
    } else {
      // When the animation finishes (after 30 frames), set the text back to the original
      this.element.innerText = this.originalString;  // The text goes back to how it was originally
    }
  }
}

// Initialize all links with the Link class
links.forEach((link, index) => {
  new Link(link, index);  // For each link in the array `links`, create a new instance of the `Link` class
});
