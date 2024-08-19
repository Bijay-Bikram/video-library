import UserModal from "../models/UserModal.js";
import { createError } from "../utils/error.js";
import VideoModal from "../models/VideoModal.js";


export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await UserModal.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    else {
        return next(createError(403, "You can update only your account!"));
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await UserModal.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// TESTING PURPOSE ONLY
export const getAllUser = async (req, res, next) => {
    try {
        const users = await UserModal.find({}).exec();
        res.status(200).json({ Total: users.length, users: users });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await UserModal.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (error) {
            next(error);
        }
    }
    else {
        return next(createError(403, "You can delete only your account!"));
    }
}


export const subscribe = async (req, res, next) => {
    try {
        await UserModal.findByIdAndUpdate(req.user.id, { // Add user to subscribedUsers array
            $addToSet: { subscribedUsers: req.params.id },
        })
        await UserModal.findByIdAndUpdate(req.params.id, { // Increment the number of subscribers by 1 to the user who is subscribed
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscribed successfully");
        next(err);

    } catch (error) {
        next(error);
    }
}


export const unsubscribe = async (req, res, next) => {
    try {
        await UserModal.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await UserModal.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscribed successfully");
    } catch (error) {
        next(error);
    }
}

export const like = async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;

        await VideoModal.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id },
        })
        res.status(200).json("The video has been liked");
    } catch (error) {
        next(error);
    }
}

export const dislike = async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;

        await VideoModal.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        })
        res.status(200).json("The video has been disliked");
    } catch (error) {
        next(error);
    }
}
