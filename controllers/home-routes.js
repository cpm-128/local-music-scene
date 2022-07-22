// client facing routes

const router = require('express').Router();
const sequelize = require('../config/config');
const { Post, User } = require('../models');

// when visting URL/index and the user is NOT logged in, redirect to /login
// when visiting index and the user IS logged in, continuing display / with the posts displayed