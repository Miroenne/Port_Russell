const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Catway's schema for the needed fields to create a catway and save it in the database */
const Catway = new Schema({
    catwayNumber: {
        type: String,
        unique: true,
        trim : true,
        required: [true, 'Le numéro du catway est requis']
    },
    catwayType:{
        type: String, 
        enum: {values:["long", "short"], message: 'Le type du catway doit être "long" ou "short"'},
        lowercase: true,       
        required: [true, 'Le type du catway est requis']
    },
    catwayState: {
        type: String,
        trim : true,
        required: [true, 'Le statut du catway est requis']
    }
});

module.exports = mongoose.model('Catway', Catway);
