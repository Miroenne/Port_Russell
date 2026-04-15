const Reservation = require('../models/reservation');

/* CREATE Reservation service ------------------------------------- */
exports.create = async (req, res, next) => {

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return res.status(400).json({ message: 'Format de date invalide' });
    }

    if (endDate < startDate) {
        return res.status(400).json({ message: 'La date de fin doit etre posterieure ou egale a la date de debut' });
    }

    try{
        const preReservation = await Reservation.findOne({
            catwayNumber : req.params.id,
            startDate : { $lt: endDate },
            endDate : { $gt: startDate }
        });

        if(preReservation){
            console.log('Pre-reservation found:', preReservation);         
            return res.status(409).json({ message: 'Le catway est déjà réservé pour cette période' });  
        }


    }catch(error){
        console.error("Error fetching pre-reservation: ", error);
        return res.status(501).json({ message: 'Erreur lors de la vérification des réservations existantes' });
    }
    
    const tempReservation =({
        catwayNumber : req.body.catwayNumber,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        startDate,
        endDate
    });

    try{
        let reservation = await Reservation.create(tempReservation);
        res.status(200).json(reservation);
    }catch(error){
        console.error("Erreur create reservation: ", error);

        res.status(400).json({
            message : 'Erreur lors de la création de la réservation',
            name : error.name,
            code : error.code,
            errorMessage : error.message,
            errors : error.errors
        });
    }
}

/* READ all Reservation services ------------------------------------- */
exports.getAll = async (req, res, next) => {
    
    try{
        const reservations = await Reservation.find();        
        return res.status(200).json(reservations);        
    }catch(error){
        return res.status(501).json(error);
    };
}

/* READ a specific Reservation services ------------------------------------- */
exports.getOne = async (req, res, next) => {
    const idReservation = req.params.idReservation;

    try{
        let reservation = await Reservation.findOne({id: idReservation});

        if(reservation){
            return res.status(200).json(reservation);
        }

        return res.status(404).json('reservation_not_found');
    }catch(error){
        return res.status(501).json(error);
    }
}

/* UPDATE Reservation service ------------------------------------- */
exports.update = async (req, res, next) => {    
    
    const {id: catwayNumber, idReservation} = req.params;

    try{
        const reservation = await Reservation.findOne({
            _id : idReservation,
            catwayNumber : catwayNumber
        })
    

    if(!reservation){
        return res.status(404).json({ message: 'Reservation not found' });
    }

    const nextCatwayNumber = req.body.catwayNumber?.trim() || reservation.catwayNumber;
    const nextClientName = req.body.clientName?.trim() || reservation.clientName;
    const nextBoatName = req.body.boatName?.trim() || reservation.boatName;
    const nextStartDate = req.body.startDate ? new Date(req.body.startDate) : reservation.startDate;
    const nextEndDate = req.body.endDate ? new Date(req.body.endDate) : reservation.endDate;

    if (Number.isNaN(nextStartDate.getTime()) || Number.isNaN(nextEndDate.getTime())) {
        return res.status(400).json({ message: 'Format de date invalide' });
    }

    if (nextEndDate < nextStartDate) {
        return res.status(400).json({ message: 'La date de fin doit etre posterieure ou egale a la date de debut' });
    }

    
        const preReservation = await Reservation.findOne({
            _id : { $ne: idReservation },
            catwayNumber : nextCatwayNumber,
            startDate : { $lt: nextEndDate },
            endDate : { $gt: nextStartDate }
        });

        if(preReservation){
            console.log('Pre-reservation found:', preReservation);         
            return res.status(400).json({ message: 'Le catway est déjà réservé pour cette période' });  
        }

        reservation.catwayNumber = nextCatwayNumber;
        reservation.clientName = nextClientName;
        reservation.boatName = nextBoatName;
        reservation.startDate = nextStartDate;
        reservation.endDate = nextEndDate;

        await reservation.save();
        return res.status(200).json(reservation);   
    }
    catch(error){
        if(error.name === 'ValidationError' || error.name === 'CastError'){
            return res.status(400).json({ message : 'Invalid data format', details: error.message });
        }
        res.status(500).json({ message : 'server_error', details: error.message });
    }
};

/* DELETE Reservation service ------------------------------------- */
exports.delete = async (req, res) => {
    const catwayNumber = req.params.id;
    const idReservation = req.params.idReservation;

    try{
        const result = await Reservation.deleteOne({
            catwayNumber : catwayNumber,
             _id : idReservation
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }        
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}