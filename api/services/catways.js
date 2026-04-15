const Catway = require('../models/catway');

/**
 * CREATE a new catway
 * Logic: Checks if the catwayNumber already exists to avoid duplicates (409 Conflict).
 */
exports.create = async (req, res) => {

    try{
        // Check if a catway with the same number already exists in the database
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
    // Map request body data to a temporary object for creation
    const tempCatway =({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState : req.body.catwayState
    });

    try{
        // Persistence: save the new catway to the database
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

/**
 * GET ALL catways
 * Fetches the entire collection of catways from the database.
 */

exports.getAll = async (req, res, next) => {
    try{
        const catways = await Catway.find();
        return res.status(200).json(catways);        
    }catch(error){
        return res.status(501).json(error);
    };
}

/**
 * GET ONE specific catway
 * Search by catwayNumber (provided in params as :id).
 */

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

/**
 * UPDATE a catway
 * Business Rule: Only the 'catwayState' property can be modified after creation.
 */

exports.update = async (req, res, next) => {

    const id = req.params.id;
    // Extract and trim the new state value from the request body
    const tempState = req.body.catwayState?.trim();

    try{
        let catway = await Catway.findOne({catwayNumber : id});

        if(catway){
            // Règle métier actuelle: seul l'état du catway est modifiable après création.
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

/**
 * DELETE a catway
 * Removes a catway document using its unique catwayNumber.
 */

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try{
        await Catway.deleteOne({catwayNumber :  id});
        return res.sendStatus(204);
    }catch(error){
        res.status(501).json(error);
    }
}
