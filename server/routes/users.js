import express from 'express';
import { deleteUser, dislike, getAllUser, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// Update user
router.put("/:id", verifyToken, update);

// get a user
router.get("/find/:id", getUser);

// get all user (TESTING PURPOSE ONLY)
router.get("/find", getAllUser);

// Delete 
router.delete("/:id", verifyToken, deleteUser);

// Subscribe a users
router.put("/sub/:id", verifyToken, subscribe);

// Unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//Like a video
router.put("/like/:videoId", verifyToken, like);

// Dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

// Note: Why we use "like" & "dislike" route in users instead of videos?
// To use user Id on likes and dislikes.

export default router;
