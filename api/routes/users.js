const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

/* Authentification of the user */
router.post('/login', service.login);
/* Logout with token's verification for security */
router.get('/logout', private.verifyToken, service.logout);
/* Get all the users from the database */
router.get('/', private.verifyToken, service.getAll);
/* Get a specific user from the database with his email */
router.get('/:email', private.verifyToken, service.getOne);
/* Create a new user in the database */
router.post('/', service.create);
/* Update a user in the database with his email */
router.put('/:email', private.verifyToken, service.update);
/* Delete a user from the database with his email */
router.delete('/:email', private.verifyToken, service.delete);


module.exports = router;
