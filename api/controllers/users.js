const loginService = require('../services/users') ;

exports.login = async (req, res,) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const loginResult = await loginService.login(email, password);

        console.log(loginResult);

        res.status(200).json(loginResult);
    }catch(err){
        res.status(400).json({error: err.message});
    
    }
}