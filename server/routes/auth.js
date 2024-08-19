import express from 'express';
import { signin, signup } from '../controllers/auth.js';


const router = express.Router();

// Create a user
router.post('/signup', signup);

// sign In
router.post('/signin', signin);

// Google Auth
router.post('/google',);

export default router;