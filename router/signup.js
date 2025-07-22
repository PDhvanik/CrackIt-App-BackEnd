import mongoose from "mongoose";
import { Router } from "express";
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
const router = new Router();

router.post('/api/signup', async (req, res) => {
    console.log(req.body);

    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    try {
        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });

        const response = await newUser.save();
        console.log('User created successfully: ', response)
        return res.status(201).json({ status: 'Created!' });
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Username or email already exists!';
        }
        return res.status(400).json({ status: 'error', error: err.message });
    }
});

export default router;