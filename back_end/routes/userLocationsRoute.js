import express from 'express';
import postUserLocation from '../db/services/locations/postUserLocation.js';
import getUserLocations from '../db/services/locations/getUserLocations.js';
import deleteUserLocation from '../db/services/locations/deleteUserLocation.js';
import patchUserLocation from '../db/services/locations/patchUserLocation.js';

const router = express.Router();


router.post('/', async (req, res) => {
    if (!req.userId || !req.body) {
        return res.status(400).json({ error: "Missing values" });
    }
    const response = await postUserLocation(req.userId, req.body)
    if (response && response.message) {
        return res.status(200).json({ message: response.message });
    } else {
        return res.status(400).json({ error: response ? response.message : "Unknown error" })
    }
})

router.delete('/', async (req, res) => {
    if (!req.userId || !req.body) {
        return res.status(400).json({ error: "Missing values" });
    }
    const response = await deleteUserLocation(req.userId, req.body)
    if (response.message) {
        console.log("response.message", response.message);
    }
    if (response && response.message) {
        return res.status(200).json({ message: response.message });
    } else {
        return res.status(400).json({ error: response ? response.message : "Unknown error" })
    }
})

router.patch('/', async (req, res) => {
    if (!req.userId || !req.body) {
        return res.status(400).json({ error: "Missing values" });
    }
    const response = await patchUserLocation(req.userId, req.body)
    if (response.message) {
        console.log("response.message", response.message);
    }
    if (response && response.message) {
        return res.status(200).json({ message: response.message });
    } else {
        return res.status(400).json({ error: response ? response.message : "Unknown error" })
    }
})

router.get('/', async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ error: "Missing values" });
    }
    const userLocations = await getUserLocations(req.userId)
    console.log("userLocations", userLocations);

    if (userLocations) {
        console.log("Location request successfully received.");

        return res.status(200).json({ locations: userLocations.locations });
    } else {
        return res.status(400).json({ error: "No locations found" });
    }
})

export default router;



