import express from 'express';

import getUser from '../db/services/users/getUser.js';
import firebaseAuth from '../services/authentication/firebaseAuth.js';
import newUserCreate from '../db/services/users/newUserCreate.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getUserDetails from '../db/services/users/getUserDetails.js';
import putUserDetails from '../db/services/users/putUserDetails.js';
import userPhoto from '../storage/userPhoto.js';
dotenv.config();

const router = express.Router();

router.get('/user', async (req, res) => {
    const { uid, email, photoUrl } = req.query;
    if (!uid || !email || !photoUrl) {
        return res.status(400).json({ error: "Missing values" });
    }

    const authSuccess = await firebaseAuth(uid);
    if (!authSuccess) {
        return res.status(500).json({ error: "Failed to fetch user" });
    }

    let user = await getUser(uid, email);
    if (!user) {
        user = await newUserCreate(uid, email, photoUrl)
        if (user) {
            console.log("newUserCreate", user);

        }
    }
    console.log("userConnect", user);
    userPhoto(photoUrl, user._id)


    const payload = { uid: user._uid, email: user.email }
    const secret = process.env.JWT_TOKEN;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    const token = jwt.sign(payload, secret, options)

    res.cookie('token', token, { httpOnly: true, secure: false });
    res.status(200).json({ token })
});


router.get('/', async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ error: "Missing values" });
    }
    const userData = await getUserDetails(req.userId)

    if (userData) {
        console.log("Date request successfully received");

        return res.status(200).json({ userData });
    } else {
        return res.status(400).json({ error: "No data found" });
    }
})

router.put('/', async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ error: "Missing values" });
    }
    const userData = await putUserDetails(req.userId, req.body.value)

    if (userData.success) {
        console.log("Date request successfully put");

        return res.status(200).json(userData);
    } else {
        return res.status(400).json({ error: "No data put" });
    }
})

export default router