import mongoose from "mongoose";
import { v4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _uid: { type: String, required: true },
    email: { type: String, required: true },
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    birthDate: { type: String, default: null },
    gender: { type: String, default: null },
    maritalStatus: { type: String, default: null },
    updatedDate: { type: Date, default: Date.now },
    publicId: { type: String, default: () => v4() },
});


const locationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    address: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    name: String,
    notes: { type: String, default: null },
    tripTypes: { type: [String], default: [] },
    visit: { type: Boolean, default: false },
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
});

const locationsArrSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [locationSchema],
        default: []
    }
})

const childrenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true }
})


const usersSettingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    selectedPlaces: {
        type: [String],
        default: []
    },
    typesOfTrips: {
        type: [String],
        default: []
    },
    children: {
        type: [childrenSchema],
        default: []
    }
});
const placesTypesSchema = new mongoose.Schema({
    hebrew: { type: String, required: true },  
    english: { type: String, required: true }
})


const User = mongoose.model('User', userSchema);
const Locations = mongoose.model('Locations', locationsArrSchema);
const UsersSettings = mongoose.model('UsersSettings', usersSettingsSchema);
const PlacesTypes = mongoose.model('PlacesTypes', placesTypesSchema);

export { User, Locations, UsersSettings, PlacesTypes};


