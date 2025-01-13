import express from 'express';
import getUserLocations from '../db/services/locations/getUserLocations.js';
import getUserSettings from '../db/services/userSettings/getUserSettings.js';
import getUser from '../db/services/users/getUser.js';
import firebaseAuth from '../services/authentication/firebaseAuth.js';
import newUserCreate from '../db/services/users/newUserCreate.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/user', async (req, res) => {
    const { uid, email } = req.query;
    if (!uid || !email) {
        return res.status(400).json({ error: "Missing values" });
    }

    const authSuccess = await firebaseAuth(uid);
    if (!authSuccess) {
        return res.status(500).json({ error: "Failed to fetch user" });
    }

    let user = await getUser(uid, email);
    if (!user) {
        user = await newUserCreate(uid, email)
        if (user) {
            console.log("newUserCreate", user);

        }
    }

    const payload = { uid: user._uid, email: user.email }
    const secret = process.env.JWT_TOKEN;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    const token = jwt.sign(payload, secret, options)

    // const userLocations = await getUserLocations(user._id, user.email);
    // const userSettings = await getUserSettings(user._id, user.email);

    // if (!userSettings) {
    //     return res.status(500).json({ error: "Failed to fetch user userSettings" });
    // } if (!userLocations) {
    //     return res.status(500).json({ error: "Failed to fetch user userLocations" });
    // } else {
    //     res.status(200).json({user: user.email, userSettings, userLocations});
    // }
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.status(200).json({ token })     //({userLocations, userSettings });
});

export default router