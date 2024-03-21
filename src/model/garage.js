const mongoose = require('mongoose');
const { StatusEnum } = require("../constants/user.constant");
const { addUpdatedByPreSave, addCreatedByPreSave } = require("../helper/db.helper");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Custom function to validate coordinates
function validateCoordinates(value) {
    // Check if location is present and not null
    if (this.location && value) {
        // Validate coordinates format
        return Array.isArray(value) && value.length === 2;
    }
    // Bypass validation if location is missing or null
    return true;
}

const GarageSchema = new Schema({
    name: { 
        type: String, 
        default: '',
        trim: true,
        required: true
    },
    ownerName: {
        type: String
    },
    address: {
        postalCode: {
            type: Number
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String,
            required: true
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
            validate: {
                validator: validateCoordinates,
                message: 'Invalid location coordinates: must be an array with two elements'
            }
        }
    },
    phoneNumber: {
        type: Number
    },
    status: {
        type: String,
        enum: StatusEnum,
        default: 'ACTIVE'
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { collection: 'Garage', timestamps: true });

// Index location field for geospatial queries
GarageSchema.index({ location: '2dsphere' });

const Garage = mongoose.model('Garage', GarageSchema);
module.exports = Garage;
