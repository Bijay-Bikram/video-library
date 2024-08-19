import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../firebase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';


const Container = styled.div`
width: 100%;
height: 100%;
z-index: 100;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding: 20px;
position: relative;
display: flex;
flex-direction: column;
gap: 20px;
`
const Close = styled.div`
position: absolute;
top: 20px;
right: 20px;
cursor: pointer;
`
const Title = styled.h1`
font-weight: 500;
text-align:center;
`
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`

const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
resize: none;
`
const UploadButton = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color:${({ theme }) => theme.soft}; ;
color: ${({ theme }) => theme.textSoft};
`

const Label = styled.label`
font-size: 14px;
`

const Upload = ({ setOpen }) => {
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const [imgUpload, setImgUpload] = useState(false)
    const [vidUpload, setVidUpload] = useState(false)

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // Function to upload files to Firebase Storage
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);


        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (urlType === 'imgUrl') {
                    setImgPerc(Math.round(progress))
                } else {
                    setVideoPerc(Math.round(progress))
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            // Error handler function
            (error) => {
                console.error(error)
            },
            // function to get the download URL
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                        // Note: From downloadURL we will render the video or image in the frontend.
                    })
                });
            }
        );
    }

    useEffect(() => { video && uploadFile(video, 'videoUrl') }, [video]);
    useEffect(() => { image && uploadFile(image, 'imgUrl') }, [image]);


    // Upload Video,image and other data to the backend
    const handleUpload = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/videos', { ...inputs, tags })
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    // Handle img upload
    const handleImgUpload = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
        setImgUpload(true)
    }

    // Handle vid upload
    const handleVidUpload = (e) => {
        e.preventDefault()
        setVideo(e.target.files[0])
        // e.target.files[0] will be the first file selected by the user.
        setVidUpload(true)
    }

    // -------JSX Elements-----------
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}><ClearIcon /></Close>
                <Title>Upload new Video</Title>

                {/* Video */}
                <div className='flex flex-col gap-1'>
                    {vidUpload && videoPerc < 100 ? "Uploading: " + videoPerc + "%" : (videoPerc === 100 ? "Video Uploaded" : "")}
                    <Label htmlFor="video">Video :
                        <Input
                            id='video'
                            type="file"
                            accept='video/.mp4,.x-m4v,.mkv'
                            onChange={handleVidUpload}
                        />
                    </Label>
                </div>

                {/* Title */}
                <Input
                    type="text"
                    name='title'
                    placeholder='Title'
                    onChange={handleChange}
                    required
                />

                {/* Description */}
                <Desc
                    placeholder='Description'
                    rows={8}
                    name='desc'
                    onChange={handleChange}
                    required
                />

                {/* Tags */}
                <Input
                    type="text"
                    placeholder='Seperate the tags with commas'
                    onChange={(e) => setTags(e.target.value.split(","))}
                    required
                />

                {/* Image */}
                <div className='flex flex-col gap-1'>
                    {imgUpload && imgPerc < 100 ? "Uploading: " + imgPerc + "%" : (imgPerc === 100 ? "Image Uploaded" : "")}
                    <Label htmlFor="img">Image :
                        <Input
                            id='img'
                            type="file"
                            accept='image/.jpeg, .png, .jpg '
                            onChange={handleImgUpload}
                            required
                        />
                    </Label>
                </div>

                <UploadButton onClick={handleUpload}>Upload</UploadButton>
            </Wrapper>
        </Container>
    )
}

export default Upload
