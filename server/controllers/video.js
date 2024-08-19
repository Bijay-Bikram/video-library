import UserModal from "../models/UserModal.js";
import VideoModal from "../models/VideoModal.js";
import { createError } from "../utils/error.js"



export const addVideo = async (req, res, next) => {
    try {
        const newVideo = await VideoModal.create({ userId: req.user.id, ...req.body });
        res.status(200).json(newVideo);
    } catch (error) {
        next(error);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await VideoModal.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));

        if (req.user.id === video.userId) {
            const updatedVideo = await VideoModal.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedVideo);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await VideoModal.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));

        if (req.user.id === video.userId) {
            await VideoModal.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted");
        }
    } catch (error) {
        next(error);
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await VideoModal.findById(req.params.id);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
}

export const addView = async (req, res, next) => {
    try {
        const video = await VideoModal.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
        res.status(200).json('The view has been increased');
    } catch (error) {
        next(error)
    }
}

export const random = async (req, res, next) => {
    try {
        const videos = await VideoModal.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const trend = async (req, res, next) => {
    try {
        const videos = await VideoModal.find({}).sort({ views: -1 });
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await UserModal.findById(req.user.id);
        const subscribedChannel = user.subscribedUsers; // this is an array of channel ids

        const list = await Promise.all( // Return after fulfilling all promises
            subscribedChannel.map((channelId) => {
                return VideoModal.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => a.createdAt - b.createdAt));
    } catch (error) {
        next(error);
    }
}

export const getByTag = async (req, res, next) => {
    try {
        // console.log(req.query.tags);
        const tags = req.query.tags.split(',');
        const trimmedTags = tags.map((tag) => tag.trim()); // Trim each item
        const searchRegex = trimmedTags.map((tag) => new RegExp(`\\b${tag}\\b`, "i")); //Add regex in each item
        const videos = await VideoModal.find(
            { tags: { $in: searchRegex } },
            {},
            { limit: 20 }
        );
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const search = async (req, res, next) => {
    try {
        const query = req.query.q;
        const videos = await VideoModal.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const userVideos = async (req, res, next) => {
    try {
        const getVideos = await VideoModal.find({ userId: req.user.id });
        res.status(200).json(getVideos);
    } catch (error) {
        next(error)
    }
}