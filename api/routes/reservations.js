var express = require('express');
// mergeParams allows access to req.params.id (catway) defined
// in the parent router /catways/:id/reservations.
const router = express.Router({mergeParams : true});
// Import the reservation service to handle business logic related to reservations.
const service = require('../services/reservations');


/**
 * RESERVATION RESOURCE ROUTES (CRUD)
 */

/* Create a new reservation entry in the database */
router.post('/', service.create);

/* Retrieve the list of all reservations and their informations */
router.get('/', service.getAll);

/* Fetch a specific reservation from the database using its ID and the reserved catway number */
router.get('/:idReservation', service.getOne);

/* Update the information of a specific reservation using its ID and the reserved catway number */
router.put('/:idReservation', service.update);

/* Remove a specific reservation from the database */
router.delete('/:idReservation', service.delete);

// Export the router to be used in routes/catways.js for mounting as a sub-resource under /catways/:id/reservations.
module.exports = router;
