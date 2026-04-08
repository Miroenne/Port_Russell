var express = require('express');
const router = express.Router({mergeParams : true});

const service = require('../services/reservations');

/* Create a new reservation in the database */
router.post('/', service.create);
/* Get all the reservations's informations */
router.get('/', service.getAll);
/* Get a specific reservation from his reservation id*/
router.get('/:id', service.getOne);
/* Update a specific reservation from his reservation id */
router.put('/:id', service.update);
/* Delete a specific reservation from his reservation id */
router.delete('/:id', service.delete);

module.exports = router;