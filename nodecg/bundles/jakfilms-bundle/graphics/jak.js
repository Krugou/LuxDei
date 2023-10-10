document.addEventListener('DOMContentLoaded', () => {
	// Get references to the HTML elements
	// Get the URL parameters
	const urlParams = new URLSearchParams(window.location.search);

	// Set the header text to the "header" parameter value, or a default value if it's not set
	const headerText = urlParams.get('header') || 'Jak Films';
	document.getElementById('header').textContent = headerText;

	// Set the subtext to the "subtext" parameter value, or a default value if it's not set
	const subtext = urlParams.get('subtext') || 'Lähetysalkaa kohta...';
	document.getElementById('subtext').textContent = subtext;


	// You can define more animations or behaviors here as needed
});
