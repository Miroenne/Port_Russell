const Catway = require('../models/catway');

exports.create = async (req, res) => {

    try{
        const existingCatway = await Catway.findOne({catwayNumber : req.body.catwayNumber});

        if(existingCatway){
            return res.status(409).json({message : "Ce numéro de catway est déjà utilisé"});
        }
    }catch(error){
        console.error("Erreur lors de la vérification de l'existence du catway: ", error);
        return res.status(500).json({
            message : 'Erreur lors de la vérification de l\'existence du catway'
        });
    } 

    const tempCatway =({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState : req.body.catwayState
    });

    try{
        let catway = await Catway.create(tempCatway);
        res.status(200).json(catway);
    }catch(error){
        console.error("Erreur create catway: ", error);

        res.status(400).json({
            message : 'Erreur lors de la création du catway',
            name : error.name,
            code : error.code,
            errorMessage : error.message,
            errors : error.errors
        });
    }
}

exports.getAll = async (req, res, next) => {
    try{
        const catways = await Catway.find();
        return res.status(200).json(catways);        
    }catch(error){
        return res.status(501).json(error);
    };
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;

    try{
        let catway = await Catway.findOne({catwayNumber: id});

        if(catway){
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_find');
    }catch(error){
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {

    const id = req.params.id;
    const tempState = req.body.catwayState;

    try{
        let catway = await Catway.findOne({catwayNumber : id});

        if(catway){
            if(!! tempState){
                catway.catwayState = tempState;
            }
            await catway.save();
            return res.status(201).json(catway);
        }
        return res.status(404).json({message : 'Catway_Not_Found'});
    }catch(error){
        res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try{
        await Catway.deleteOne({catwayNumber :  id});
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}