const mongoose = require('mongoose');
const { StatusEnum } = require("../constants/userEnum");
const { addUpdatedByPreSave, addCreatedByPreSave } = require("../helper/dbHelper");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GarageSchema = new Schema({
    name: { 
        type: String, 
        default: '' ,
        trim: true,
        required : true
    },
    ownerName : {
        type :String
    },
    address : {
        postalCode : {
            type : Number
        },
        street : {
            type : String
        },
        city : {
            type : String
        },
        country : {
            type : String
        }
    },
    location: {
		latitude: {
			type: Number
		},
		longitude: {
			type: Number
		}
    },
    phoneNumber : {
        type : Number
    },

    // userId : {
    //     type : ObjectId,
    //     ref : 'user',
    //     required : true
    // },
    status: {
        type: String,
        enum: StatusEnum,
        default: 'ACTIVE', // Optional: Set a default value
      },
    createdBy : {
        type : ObjectId,
        ref : 'user'
    },
    updatedBy : {
        type : ObjectId,
        ref : 'user',
        required : true
    },
  },{ collection: 'Garage',timestamps: true });

  // Define pre-save middleware
  GarageSchema.plugin(addCreatedByPreSave);
  GarageSchema.plugin(addUpdatedByPreSave);

  module.exports = mongoose.model('Garage',GarageSchema);