import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuccess } from '../redux/videoSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from '../firebase'

const Container = styled.div`
min-height: calc(100vh - 53px);
display: flex;
align-items: center;
justify-content: center;
color: ${({ theme }) => theme.text};
`

const Wrapper = styled.form`
width: 80%;
/* background: green; */
margin: 2rem 0;
display: flex;
flex-direction: column;
gap: 20px;

`

const Card = styled.div`
/* width: 500px; */
height: 300px;
border-radius: 10px;
margin-bottom: 20px;
background: gray;
`
const Item = styled.div`
display: flex;
flex-direction: column;
gap:4px
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
const Label = styled.label`
font-size: 1.2rem;
font-weight: 500;
`
const Button = styled.button`
border-radius: 24px;
font-size: 16px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: #8080807f;
&:hover{
    background-color: #808080ab;
}
color: ${({ theme }) => theme.text};
`
const UpdateVideo = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [tags, setTags] = useState([])
    const [img, setImg] = useState('')
    const [video, setVideo] = useState('')
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [input, setInput] = useState({})
    const [History, setHistory] = useState({})
    const { currentVideo } = useSelector(state => state.video)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    // Fetch video data & add to store
    useEffect(() => {
        setLoading(true)
        const fetchVideo = async () => {
            try {
                const res = await axios.get(`/api/videos/find/${id}`)
                dispatch(fetchSuccess(res.data))
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        fetchVideo()
    }, [id])

    // Set default video details and history
    useEffect(() => {
        setHistory(currentVideo)
        setTitle(currentVideo.title)
        setDesc(currentVideo.desc)
        setTags(currentVideo.tags)
    }, [])

    // Integrate all inputs in an obj state
    useEffect(() => {
        const handleChange = (e) => {
            setInput((prev) => {
                return { ...prev, title, desc, tags }
            })
        }
        handleChange()
    }, [title, desc, tags])


    // Handle image and video
    const handleVideoUpload = async (e) => {
        e.preventDefault()
        setVideo(e.target.files[0])
    }

    const handleImgUpload = async (e) => {
        e.preventDefault()
        setImg(e.target.files[0])
    }

    useEffect(() => {
        const changes = { ...History }
        if (imgUrl) {
            changes.imgUrl = imgUrl
            dispatch(fetchSuccess(changes))
        }
        if (videoUrl) {
            changes.videoUrl = videoUrl
            dispatch(fetchSuccess(changes))
        }
    }, [imgUrl, videoUrl])

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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    urlType === 'imgUrl' ? setImgUrl(downloadURL) : setVideoUrl(downloadURL);
                    setInput(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );
    }

    useEffect(() => { video && uploadFile(video, 'videoUrl') }, [video]);
    useEffect(() => { img && uploadFile(img, 'imgUrl') }, [img]);

    // submit the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/videos/${id}`, input)
            dispatch(fetchSuccess(res.data))
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    //Cancle the form
    const handleCancle = (e) => {
        e.preventDefault()
        dispatch(fetchSuccess(History))
        navigate('/')
        window.location.reload()
    }

    // -------JSX Elements-----------
    return (
        <>

            {!currentVideo ? <Loader /> :
                (loading ? <Loader /> :
                    (
                        <Container>
                            <Wrapper onSubmit={handleSubmit}>
                                {  /* Title */}
                                <h1 className='text-3xl text-center mb-5'>Update Video</h1>

                                {/* Image & Video section */}
                                <div className='grid grid-cols-2 gap-4 w-full h-full'>
                                    {/* Image */}
                                    <div className='flex flex-col '>
                                        <div>
                                            <img src={currentVideo.imgUrl} className='w-full bg-gray-500' alt="Thumbnail" required />
                                            {imgPerc && imgPerc < 100 ? (<span>{imgPerc}%</span>) : (imgPerc === 100 && null)}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImgUpload} style={{ display: 'none' }} id='c_img' />
                                        <label className=' w-full text-center cursor-pointer text-blue-600 my-4' htmlFor="c_img">Change Thumbnail</label>
                                    </div>
                                    {/* Video */}
                                    <div className='flex flex-col'>
                                        {  /* Dispaly video element */}
                                        <div>
                                            <video src={currentVideo.videoUrl} className='w-full bg-gray-500' controls required></video>
                                            {videoPerc && videoPerc < 100 ? (<span>{videoPerc}%</span>) : (videoPerc === 100 && null)}
                                        </div>
                                        {/* Hidden input for video */}
                                        <input type="file" name='video' accept="video/.*" onChange={handleVideoUpload} style={{ display: 'none' }} id='c_vid' />
                                        <label className=' text-center cursor-pointer text-blue-600 my-4 ' htmlFor="c_vid">Change Video</label>
                                    </div>
                                </div>

                                {/* Title */}
                                <Item >
                                    <Label htmlFor=" c_title">Title</Label>
                                    <Input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id="c_title" placeholder='Title' required />
                                </Item>

                                {/* Description */}
                                <Item>
                                    <Label htmlFor="c_desc">Descriptions</Label>
                                    <Desc name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} id="c_desc" cols="30" rows="10" placeholder='Descriptions' required></Desc>
                                </Item>

                                {/* Tags */}
                                <Item>
                                    <Label htmlFor="c_tags">Tags</Label>
                                    <Input type="text" id='c_tags' name='tags' value={tags} onChange={(e) => setTags(e.target.value.split(','))} placeholder='Seperate the tags with commas' required />
                                </Item>

                                {/* Save & Cancle buttons */}
                                <div className='m-auto flex gap-x-20 my-3'>
                                    {/* Save btn */}
                                    <button type='submit' className='text-sm cursor-pointer flex items-center gap-1 bg-[#008cff45] hover:bg-[#008cff32] px-4 py-2 rounded-full'>Save</button>
                                    {/* Cancel btn */}
                                    <button onClick={handleCancle} className='text-sm cursor-pointer flex items-center gap-1 bg-[#008cff45] hover:bg-[#008cff32] px-4 py-2 rounded-full'>Cancle</button>
                                </div>
                            </Wrapper>
                        </Container>
                    )
                )

            }

        </>
    )
}

export default UpdateVideo

