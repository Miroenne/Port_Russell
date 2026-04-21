const express = require('express');
const router = express.Router();

// Import the user service to handle business logic related to users.
const service = require('../services/users');
// Import the private middleware to protect specific routes with token verification.
const private = require('../middlewares/private');

const controls = require('../controllers/users');


/**
 * AUTHENTIFICATION ROUTES
 */


/* Authentificate the user and generate a token/session */
router.post('/login', controls.login);

/* Terminate the session - Requires a valid token for security */
router.get('/logout', private.verifyToken, service.logout);

/**
 * USER MANAGEMENT ROUTES (CRUD)
 */

/* Retrieve all users from the database - Protected route */
router.get('/', private.verifyToken, service.getAll);

/* Fetch a specific user from the database with his email address - Protected route */
router.get('/:email', private.verifyToken, service.getOne);

/* Register a new user - Public route (No token required for signup) */
router.post('/', service.create);

/* Update user information based on email - Protected route */
router.put('/:email', private.verifyToken, service.update);

/* Remove a user from the database - Protected route */
router.delete('/:email', private.verifyToken, service.delete);

// Export the router to be used in the main app file (app.js) for mounting on the /users path.
module.exports = router;
