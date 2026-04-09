const Reservation = require('../models/reservation');

exports.create = async (req, res) => {

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return res.status(400).json({ message: 'Format de date invalide' });
    }

    if (endDate < startDate) {
    return res.status(400).json({ message: 'La date de fin doit etre posterieure ou egale a la date de debut' });
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

exports.getAll = async (req, res, next) => {
    try{
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);        
    }catch(error){
        return res.status(501).json(error);
    };
}

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

exports.update = async (req, res, next) => {
    const idReservation = req.params.idReservation;
    const temp = ({
        catwayNumber : req.body.catwayNumber,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        startDate : req.body.startDate,
        endDate : req.body.endDate
    })

    try{
        let reservation = await Reservation.findOne({id : idReservation});

        if(reservation){
            Object.keys(temp).forEach(key =>{
                if(!! temp){
                    reservation[key] = temp[key];
                }
            })
            
            await reservation.save();
            return res.status(201).json(reservation);
        }
        return res.status(404).json({message : 'reservation_Not_Found'});
    }catch(error){
        res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const idReservation = req.params.idReservation;

    try{
        await Reservation.deleteOne({id :  idReservation});
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}