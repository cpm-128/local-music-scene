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

// GET all posts with poster_id /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'song_title',
            'song_url',
            'artist_name',
            'album_name',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbAllPostData => res.json(dbAllPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});