import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo, userVideos } from '../controllers/video.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// create a Video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", verifyToken, getByTag);
router.get("/search", verifyToken, search);
router.get("/user", verifyToken, userVideos)

export default router;
