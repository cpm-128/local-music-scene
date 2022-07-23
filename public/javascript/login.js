async function signupFormHandler(e) {
	e.preventDefault();
	console.log('signup form submitted');

	const username = document.querySelector('#username-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		// check the response status
		if (response.ok) {
			console.log('success, user created');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('.create-account-form').addEventListener('submit', signupFormHandler);
