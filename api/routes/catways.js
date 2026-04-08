var express = require('express');
var router = express.Router();

const service = require('../services/catways');
const reservationsRouter = require('./reservations');

router.use('/:id/reservations', reservationsRouter);

/* Create a new catway in the database */
router.post('/', service.create);
/* Get all the catway's informations */
router.get('/', service.getAll);
/* Get a specific catway from his catway number*/
router.get('/:id', service.getOne);
/* Update a specific catway from his catway number */
router.put('/:id', service.update);
/* Delete a specific catway from his catway number */
router.delete('/:id', service.delete);

module.exports = router;