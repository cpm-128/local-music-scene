// client facing routes

const router = require('express').Router();
const sequelize = require('../config/config');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    // check for a session and redirect to /home if one exists
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //TODO: CONFIRM THIS IS THE VIEW TO RENDER ONCE WRITTEN
    res.render('index');
});

router.get('/home', (req, res) => {
    // check for a session and redirect to / if one does not exists
    // if (!req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    // get all posts to display
    Post.findAll({
        attributes: [
            'id',
            'song_title',
            'song_url',
            'artist_name',
            'album_name'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbAllPostsData => {
        // get the entire array of posts and serialize it
        const posts = dbAllPostsData.map(post => post.get({ plain: true }));
        // pass posts object to the template for logged in users ONLY
        //TODO: confirm this is the correct handlebars view to reference
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/add', (req, res) => {
    // check for a session and redirect to / if one does not exists
    // if (!req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    //TODO: CONFIRM THIS IS THE VIEW TO RENDER ONCE WRITTEN
    res.render('add');
});

module.exports = router;