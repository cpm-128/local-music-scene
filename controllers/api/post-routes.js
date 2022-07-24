const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/config');
//const withAuth = require('../../utils/auth);

//TODO: if using withAuth util function, add to all api calls except GET

// ====
// GET all posts
// POST single post
// DELETE single post
// ====

// GET all posts with user_id /api/posts
router.get('/', (req, res) => {
	Post.findAll({
		attributes: ['id', 'song_title', 'song_url', 'artist_name', 'album_name', 'created_at'],
		order: [['created_at', 'DESC']],
		include: [
			{
				model: User,
				attributes: ['username'],
			},
		],
	})
		.then((dbAllPostData) => res.json(dbAllPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// CREATE /api/posts
router.post('/', (req, res) => {
	Post.create({
		song_title: req.body.song_title,
		song_url: req.body.song_url,
		artist_name: req.body.artist_name,
		album_name: req.body.album_name,
		user_name: req.session.user_name,
    user_id: req.session.user_id,
	})
		.then((dbCreatePostData) => res.json(dbCreatePostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE single post
router.delete('/:id', (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbDeletePostData) => {
			if (!dbDeletePostData) {
				res.status(404).json({ message: 'No post found with this id.' });
				return;
			}
			res.json(dbDeletePostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
