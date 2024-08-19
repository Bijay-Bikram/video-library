
import { createError } from "../utils/error.js"
import CommentModal from "../models/CommentModal.js"
import VideoModal from "../models/VideoModal.js"

export const addComment = async (req, res, next) => {
    try {
        const videoId = req.params.id
        const newComment = new CommentModal({ userId: req.user.id, videoId, ...req.body })
        const savedComment = await newComment.save()
        res.status(201).json(savedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await CommentModal.findById(req.params.id) // finding the comment
        if (!comment) return next(createError(404, "Comment not found"))

        const video = await VideoModal.findById(comment.videoId)
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await CommentModal.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted")
        } else {
            return next(createError(403, "You can delete only your comment!"))
        }
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await CommentModal.find({ videoId: req.params.videoId }).sort({ createdAt: -1 })
        if (!comments) return next(createError(404, "No comments found"))
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}


