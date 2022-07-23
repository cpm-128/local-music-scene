async function submitNewSongHandler(e) {
	e.preventDefault();
	console.log('new song submitted');

	const songTitle = document.querySelector('#song-title-input').value.trim();
	const songLink = document.querySelector('#url-input').value.trim();
	const artistName = document.querySelector('#artist-name-input').value.trim();
	const albumName = document.querySelector('#album-name-input').value.trim();

	const response = await fetch('/api/posts/', {
		method: 'post',
		body: JSON.stringify({
			song_title: songTitle,
			song_url: songLink,
			artist_name: artistName,
			album_name: albumName,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/home');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('.submit-song-form').addEventListener('submit', submitNewSongHandler)
