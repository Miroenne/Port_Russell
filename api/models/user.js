const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

/* Import of bcrypt to hash and protect the password of the user */
const bcrypt = require('bcrypt');

/* User's schema for the needed fields to create a user and save it in the database */
const User = new Schema({
    userName: {
        type: String,
        trim : true,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        trim : true,
        required: [true, "L'email est requis"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim : true,
        /* Setting the password to have a minimum length of 8 characters */
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
    }    

}, {
    /* Adding the fields createdAt and updatedAt in the database */
    timestamps: true
});

/* Hashing the password of the user when modified before saving it in the database */
User.pre('save', async function(next) {
    /* If the password is not modified, we move to the next middleware */
    if (!this.isModified('password')) {
        return ;
    }
    
    /* Added salt to the password and hashed it with bcrypt */
    const salt = await bcrypt.genSalt(10);
    /* Hashing the password with the salt */
    this.password = await bcrypt.hash(this.password, salt);       
    
});

module.exports = mongoose.model('User', User);