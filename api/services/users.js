const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');


exports.create = async (req, res) => {
    const tempUser = ({
        userName        : req.body.userName,
        email           : req.body.email,
        password        : req.body.password,
        accessLevel     : req.body.accessLevel
    }); 

    try{
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

exports.getAll = async (req, res, next) => {
    try
    {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    }catch(error){
        return res.status(501).json(error);
    }
}

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

exports.update = async (req, res, next) => {
    const email = req.params.email;
    const temp = ({
        userName : req.body.userName,
        password : req.body.password
    });

    try{
        let user = await User.findOne({email : email});

        if (user){
            Object.keys(temp).forEach(key => {
                if (!! temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();

            return res.status(201).json(user);
        }
        return res.status(404).json({message : 'User_Not_Found'});
    }catch(error){
        res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const email = req.params.email;

    try{
        await User.deleteOne({email : email});
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email : email}, '-__V -createAt -updateAt');

        if(user){
            bcrypt.compare(password, user.password, (err, response) => {

                if(err){
                    throw new Error(err);
                }
                if (response){
                    delete user._doc.password;

                    const expireIn = 60*60*24;
                    const token = jwt.sign({
                        user : user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn : expireIn
                    });

                    res.cookie('token', token,
                    {
                        httpOnly : true,
                        sameSite : 'strict'
                    });

                    console.log('User logged successfully');

                    return res.status(200).json('authenticate_succeed');
                }
                
                return res.status(403).json('wrong_credentials');
            });
        }else{
            return res.status(404).json({ message : 'utilisateur non trouvé'});
        }
    }catch(error){
        return res.status(501).json(error);
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly : true,
        sameSite : 'strict'
    });
    res.status(200).json('logout_succeed');
}