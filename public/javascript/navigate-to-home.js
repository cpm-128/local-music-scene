async function navigateToHomeHandler(e) {
	e.preventDefault();
	console.log('navigation button clicked');
	document.location.replace('/home');
}

document.querySelector('.back-button').addEventListener('click', navigateToHomeHandler);