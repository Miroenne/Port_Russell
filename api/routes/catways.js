var express = require('express');
var router = express.Router();

/* Import the catway service to handle business logic related to catways. */
const service = require('../services/catways');
/* Import the reservations router to handle nested reservation routes under catways. */
const reservationsRouter = require('./reservations');

/**
 * NESTED ROUTES
 * * Mount the reservations router as a sub-resource.
 * mergeParams must be enabled in the reservationsRouter to access ':id' (catway ID).
 * Example: /catways/42/reservations
 */
router.use('/:id/reservations', reservationsRouter);

/**
 * CATWAY RESOURCE ROUTES (CRUD)
 */

/* Create a new catway entry in the database */
router.post('/', service.create);

/* Retrieve the list of all catways and their informations */
router.get('/', service.getAll);

/* Fetch a specific catway from the database using his ID who is based on the unique catway number*/
router.get('/:id', service.getOne);

/* Update the information of a specific catway using his ID who is based on the unique catway number */
router.put('/:id', service.update);

/* Remove a specific catway from the database */
router.delete('/:id', service.delete);

// Export the router to be used in the main app file (app.js) for mounting on the /catways path.
module.exports = router;
