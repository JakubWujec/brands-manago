import express from "express";
import { env } from "../env.js";
import UserModel from "../schema/users.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        // Create a new user
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();
        res.status(201).json({ message: "User was registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
        if (!passwordIsValid) {

            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: 86400, // 24 hours
        });

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
});

export default router;
