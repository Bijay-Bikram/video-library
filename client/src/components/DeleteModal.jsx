import React from 'react'
import axios from 'axios'

const DeleteModal = ({ setShowModal, videoId }) => {
    const d_modal = confirm("Are you sure you want to delete this video?")

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/videos/${videoId}`)
            setShowModal(false)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    d_modal && handleDelete()

    return (
        <>

        </>
    )
}

export default DeleteModal
