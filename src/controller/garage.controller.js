const { Messages } = require("../constants/message.constant");
const { StatusCode } = require("../constants/status.constant");
const { StatusEnum } = require("../constants/user.constant");
const { updateUserDetails } = require("../helper/db.helper");
const { ERROR, SUCCESS } = require("../helper/response.helper");
const { Garage} = require("../model");


// Create a new garage
exports.createGarage = async (req, res) => {
    try {
        const { name, ownerName, address, location } = req.body;
        const newGarage = new Garage({
            name,
            ownerName,
            address,
            // location: {
            //     type: 'Point',
            //     coordinates: []
            // }
        });
        // Check if location is provided
        if (location && location.coordinates && location.coordinates.latitude && location.coordinates.longitude) {
            newGarage.location = {
                type: "Point",
                coordinates: [location.coordinates.longitude, location.coordinates.latitude] // Replace longitude and latitude with actual values
            };
        }
        updateUserDetails(req,newGarage,true);
        const savedGarage = await newGarage.save();
        return SUCCESS(res,savedGarage);
        //res.status(201).json(savedGarage);
    } catch (e) {
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
};

// Get all garages
exports.getAllGarages = async (req, res) => {
    try {
        const garages = await Garage.find({status : {$ne : StatusEnum.DELETED}});
        return SUCCESS(res,garages)
    } catch (e) {
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
};

// Get a garage by ID
exports.getGarageById = async (req, res) => {
    try {
        const garage = await Garage.find({_id : req.params.id, status : {$ne : StatusEnum.DELETED}});
        if (!garage) {
            return res.status(404).json({ message: 'Garage not found' });
        }
        return SUCCESS(res,garage);
    } catch (e) {
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
};

// Update a garage by ID
exports.updateGarage = async (req, res) => {
    try {
        updateUserDetails(req,req.body,false);
        const updatedGarage = await Garage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGarage) {
            return res.status(404).json({ message: 'Garage not found' });
        }
        return SUCCESS(res,updatedGarage)
    } catch (e) {
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
};

// Delete a garage by ID
exports.deleteGarage = async (req, res) => {
    try {
        //const deletedGarage = await Garage.findByIdAndDelete(req.params.id);
        let data = { status : StatusEnum.DELETED};
        updateUserDetails(req,data,false);
        const deletedGarage = await Garage.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!deletedGarage) {
            return res.status(404).json({ message: 'Garage not found' });
        }
        return SUCCESS(res,{},'Garage deleted successfully');
    } catch (e) {
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
};
