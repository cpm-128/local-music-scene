async function navigateToAddHandler(e) {
  e.preventDefault();
  console.log('navigation button clicked')
  document.location.replace('/add');
}

document.querySelector(".submit-button").addEventListener('click', navigateToAddHandler)