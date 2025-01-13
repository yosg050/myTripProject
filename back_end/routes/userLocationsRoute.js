import express from 'express';
import postUserLocation from '../db/services/locations/postUserLocation.js';
import getUserLocations from '../db/services/locations/getUserLocations.js';

const router = express.Router();

router.post('/postUserLocation', async (req, res) => {
    if (!req.userId) {
  
        return res.status(400).json({ error: "Missing values" });
    }
    // console.log("req.userId: ", req.userId);
    // console.log("location:", req.body);

    const newLocation = await postUserLocation(req.userId, req.body)
    

    if (newLocation && newLocation.message) {
        return res.status(200).json({ message: newLocation.message });
    } else {

        // console.log("2", newLocation.message);

        return res.status(400).json({ error: newLocation ? newLocation.message : "Unknown error" })
    }
})

router.get('/getUserLocations', async (req, res) => {
    if (!req.userId) {
        console.log("3", newLocation.message);
        return res.status(400).json({ error: "Missing values" });
    }

    const userLocations = await getUserLocations(req.userId)
    console.log("userLocations", userLocations);

    if (userLocations) {
        console.log("Location request successfully received.");

        return res.status(200).json({ locations: userLocations.locations });
    } else {
        console.log("5", newLocation.message);
        return res.status(400).json({ error: "No locations found" });
    }
})

export default router;



