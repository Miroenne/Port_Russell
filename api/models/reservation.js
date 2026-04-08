const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Reservation's schema for the needed fields to create a reservation and save it in the database */
const Reservation = new Schema({
    catwayNumber:{
        type: String,
        required: [true, 'Le numéro du catway est requis']
    },
    clientName:{
        type: String,
        trim : true,
        required: [true, 'Le nom du client est requis']
    },
    boatName:{
        type: String,
        trim : true,
        required: [true, 'Le nom du bateau est requis']
    },
    startDate: {
        type: Date,
        required: [true, 'La date de début de la réservation est requise']
    },
    endDate: {
        type: Date,
        required: [true, 'La date de fin de la réservation est requise']
    }
}, {
    /* Adding the fields createdAt and updatedAt in the database */
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);