document.addEventListener('DOMContentLoaded', () => {
  // Get references to the HTML elements
  const headerElement = document.getElementById('header');
  const subtextElement = document.getElementById('subtext');

  // Update the text content of the elements
  headerElement.textContent = 'Header Text';
  subtextElement.textContent = 'Smaller Text Below';

  // Add a class to the header for an additional animation (e.g., scaling)
  headerElement.classList.add('scaleAnimation');

  // You can define more animations or behaviors here as needed
});
