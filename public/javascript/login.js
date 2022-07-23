async function loginHandler(e) {
  e.preventDefault()
  console.log('login button clicked')

  const username = document.querySelector('#input-username').value.trim()
  const password = document.querySelector('#input-password').value.trim()

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('')