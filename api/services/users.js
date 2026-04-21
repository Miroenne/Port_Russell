const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const login = require('../controllers/users');

/**
 * CREATE a new user
 * Logic: Checks for email availability before creation to provide a clear conflict error (409).
 */
exports.create = async (req, res) => {

    try{
        // Application-level check to verify if the email is already registered
        // (In addition to the MongoDB unique constraint).
        const existingUser = await User.findOne({email : req.body.email});

        if(existingUser){
            return res.status(409).json({message : "Cet email est déjà utilisé"});
        }
    }catch(error){
        console.error("Erreur lors de la vérification de l'existence de l'utilisateur: ", error);
        return res.status(500).json({
            message : 'Erreur lors de la vérification de l\'existence de l\'utilisateur'
        });
    }    

    // Prepare user data from request body
    const tempUser = ({
        userName        : req.body.userName,
        email           : req.body.email?.toLowerCase().trim(), // Normalize email to lowercase and trim whitespace
        password        : req.body.password,
        accessLevel     : req.body.accessLevel
    }); 

    try{
        // Persist new user to the database
        let user = await User.create(tempUser);
        res.status(200).json(user);
    }catch(error){
        console.error("Erreur create user: ", error);

        res.status(400).json({
        message             : "Erreur lors de la création de l'utilisateur",
            name            : error.name,
            code            : error.code,
            errorMessage    : error.message,
            errors          : error.errors
        });
    }
}

/**
 * GET ALL users
 * Fetches all users while excluding the password field for security.
 */
exports.getAll = async (req, res, next) => {
    try
    {
        // Use projection to hide sensitive password data
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    }catch(error){
        return res.status(501).json(error);
    }
}

/**
 * GET ONE specific user
 * Search by email address provided in params.
 */
exports.getOne = async (req, res, next) => {
    const email = req.params.email;

    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    }catch(error){
        return res.status(501).json(error);
    }
}

/**
 * UPDATE user information
 * Logic: Includes email availability check and partial update implementation.
 */
exports.update = async (req, res, next) => {

    try{
        // If the email is being changed, ensure the new value is not already taken by another user.
        const existingUser = await User.findOne({email : req.body.email});

        if(existingUser){
            return res.status(409).json({message : "Cet email est déjà utilisé"});
        }
    }catch(error){
        console.error("Erreur lors de la vérification de l'existence de l'utilisateur: ", error);
        return res.status(500).json({
            message : 'Erreur lors de la vérification de l\'existence de l\'utilisateur'
        });
    }  

    const email = req.params.email;
    const temp = ({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
    });

    try{
        let user = await User.findOne({email : email});

        if (user){

            // Sanitize inputs: use provided data or fallback to existing values
            const nextUserName = req.body.userName?.trim() || user.userName;
            const nextEmail = req.body.email?.trim() || user.email;
            
            // Password update: if a new password is provided, it will be hashed by the model's pre-save hook.
            if (req.body.password) {
                user.password = req.body.password; // Model hook will handle hashing
            }

            user.userName = nextUserName;
            user.email = nextEmail;
            
            await user.save(); // Model hook will handle password re-hashing if changed.

            return res.status(201).json(user);
        }
        return res.status(404).json({message : 'User_Not_Found'});
    }catch(error){
        res.status(501).json(error);
    }
}

/**
 * DELETE user
 * Removes user based on their unique email address.
 */
exports.delete = async (req, res, next) => {
    const email = req.params.email;

    try{
        await User.deleteOne({email : email});
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}

/**
 * USER LOGIN
 * Logic: Verifies credentials, generates a JWT, and sets an HTTP-only cookie.
 */
/* exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        // Fetch user while excluding metadata fields
        const user = await User.findOne({email : email}, '-__V -createAt -updateAt');

        if(user){
            // Compare the provided plain-text password with the stored hash
            bcrypt.compare(password, user.password, (err, response) => {

                if(err){
                    throw new Error(err);
                }
                if (response){
                    // Remove password from the object before signing the token or sending the response
                    delete user._doc.password;

                    const expireIn = 60*60*24;
                    // Generate JWT containing minimal user info as proof of identity for private routes.
                    const token = jwt.sign({
                        user : user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn : expireIn
                    });

                    // Set token in an HTTP-only cookie to mitigate XSS (Cross-Site Scripting) risks.
                    res.cookie('token', token,
                    {
                        httpOnly : true,
                        sameSite : 'strict'
                    });                    

                    console.log('User logged successfully');

                    return res.status(200).json({
                        message: 'authenticate_succeed',
                        user: {
                            userName: user.userName,
                            email: user.email
                        }
                    });
                }
                
                return res.status(403).json('wrong_credentials');
            });
        }else{
            return res.status(404).json({ message : 'utilisateur non trouvé'});
        }
    }catch(error){
        return res.status(500).json(error);
    }
} */ 

exports.login = async (email, password, res) => {
    

    try {
        // Fetch user while excluding metadata fields
        const user = await User.findOne({email : email}, '-__V -createAt -updateAt');

        if(user){
            // Compare the provided plain-text password with the stored hash
            bcrypt.compare(password, user.password, (err, response) => {

                if(err){
                    throw new Error(err);
                }
                if (response){
                    // Remove password from the object before signing the token or sending the response
                    delete user._doc.password;

                    const expireIn = 60*60*24;
                    // Generate JWT containing minimal user info as proof of identity for private routes.
                    const token = jwt.sign({
                        user : user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn : expireIn
                    });

                    // Set token in an HTTP-only cookie to mitigate XSS (Cross-Site Scripting) risks.
                                        

                    console.log('User logged successfully');

                    return{
                        message: 'authenticate_succeed',                        
                        token: cookie('token', token,
                    {
                        httpOnly : true,
                        sameSite : 'strict'
                    }),
                        user: {
                            userName: user.userName,
                            email: user.email
                        }
                    }

                    console.log(token);
                    console.log(user);
                }
                return res.status(403).json('wrong_credentials');
            });
        }else{
            return res.status(404).json({ message : 'utilisateur non trouvé'});
        }
    }catch(error){
        return res.status(500).json(error);
    }
}

/**
 * USER LOGOUT
 * Logic: Clears the authentication token cookie.
 */
exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly : true,
        sameSite : 'strict'
    });
    res.status(200).json('logout_succeed');
}
