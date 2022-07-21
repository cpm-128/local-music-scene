const router = require('express').Router();
const { User } = require('../../models');
//const withAuth = require('../../utils/auth);

//TODO: if using withAuth util function, add to all api calls except GET

// ====
// GET all users
// POST single user
// LOGIN
// LOGOUT
// ====

// GET /api/users for testing purposes
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(dbAllUserData => res.json(dbAllUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    // access session information
    .then(dbCreateUserData => {
        req.session.save(() => {
            req.session.user_id = dbCreateUserData.id;
            req.session.username = dbCreateUserData.username;
            req.session.loggedIn = true;

            res.json(dbCreateUserData);
        });
    });
});

// LOGIN route for authentication - compares user-entered password to hashed password
router.post('/login', (req, res) => {
    // expects {username: 'user1234', password: 'password1234'}
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserLogin => {
        // does user exist?
        if (!dbUserLogin) {
            res.status(400).json({ message: 'Incorrect credentials. Unable to login.' });
            return;
        }

        // verify password
        const validPassword = dbUserLogin.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect credentials. Unable to login.' });
            return;
        }

        // save session information
        req.session.save(() => {
            req.session.user_id = dbUserLogin.id;
            req.session.username = dbUserLogin.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserLogin, message: 'You are now logged in.' });
        });
    });
});

// LOGOUT by destroying session data
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;