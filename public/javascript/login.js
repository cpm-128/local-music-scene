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

async function loginFormHandler(e) {
	e.preventDefault();
	console.log('login form submitted');

	const username = document.querySelector('#username-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (username && password) {
		console.log('username and password present');
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('.create-account-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
