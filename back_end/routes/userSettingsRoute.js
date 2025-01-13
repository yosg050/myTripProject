import express from 'express';
import getUserSettings from '../db/services/userSettings/getUserSettings.js';
import postUserSittings from '../db/services/userSettings/postUserSettings.js';

const router = express.Router();

router.post('/postUserSetting', async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ error: "Missing values" });
    }

    const newSetting = await postUserSittings(req.userId, req.body)
     // , newSetting.message

    if (newSetting) {
        
        return res.status(200).json({ success: true, message: "data added successfully" });
    } else {
        return res.status(400).json({ success: false, message: "Failed to add data" });
    }
})

router.get('/getUserSettings', async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ error: "Missing values" });
    }

    const userSettings = await getUserSettings(req.userId)
    console.log("userSettings", userSettings);

    if (userSettings) {
        console.log("Setting request successfully received");

        return res.status(200).json({ userSettings });
    } else {
        return res.status(400).json({ error: "No settings found" });
    }
})

export default router;



