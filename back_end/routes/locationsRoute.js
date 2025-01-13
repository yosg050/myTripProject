import express from 'express';
const router = express.Router();

import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY_GOOGLE;
import filterLocations from '../services/locations/filterLocations.js';
import searchBox from '../services/locations/searchBox.js';
import placeId from '../services/locations/placeId.js';



router.post('/filter-locations', async (req, res) => {
    try {
        const { locations, searchParams } = req.body; //query;//body;
        const filteredLocations = await filterLocations({ locations, searchParams, apiKey });
        res.status(200).json(filteredLocations);
    } catch (error) {
        console.error('Error in filtering locations:', error);
        res.status(400).json({ error: 'Error processing request' });
    }
});


router.get('/placeDetails', async (req, res) => {
    const value = req.query
    console.log(req.query);
    await placeId(value, apiKey).then((map) => {
        res.status(200).json(map)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/autocomplete', async (req, res) => {
    const value = req.query
    // console.log(value);
    await searchBox(value, apiKey).then((map) => {
        res.status(200).json(map)
        // console.log(map);
    }).catch((e) => {
        res.status(400).send(e)
    })
})

export default router