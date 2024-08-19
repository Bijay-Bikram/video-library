import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import app from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'


const Container = styled.div`
min-height: calc(100vh - 53px);
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.form`
background: #80808027;
max-width: 100%;
/* When max-width is given, the width will be fit to its content */
display: flex;
justify-content: space-around   ;
gap:2rem;
color: ${({ theme }) => theme.text};
`
const Img = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
`
const Info = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
const Input = styled.input`
border:1px solid ${({ theme }) => theme.testSoft};
border-radius:3px;
padding: 10px;
background-color:transparent;
width: 100%;
color: ${({ theme }) => theme.text};`

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

const EditProfile = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(undefined);
    const [imgUrl, setImgUrl] = useState(undefined)
    const [userHistory, setUserHistory] = useState({})
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(inputs)
    // Inserting Default value
    useEffect(() => {
        setUserHistory(currentUser)
        setUserName(currentUser.name)
        setEmail(currentUser.email)
    }, [])

    // Change & insert new imgUrl in currentUser state
    useEffect(() => {
        const handleHistory = () => {
            if (imgUrl) {
                let changes = { ...userHistory }
                changes.img = imgUrl
                dispatch(loginSuccess(changes))
            }
        }
        handleHistory()
    }, [imgUrl])


    // Integrate all inputs to the inputs state as an object
    useEffect(() => {
        setInputs(prev => {
            return { ...prev, name: userName, email }
        })
    }, [userName, email])


    // Function to upload files to Firebase Storage
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
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
                    setImgUrl(downloadURL)
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );
    }
    useEffect(() => { image && uploadFile(image, 'img') }, [image]);


    // Updating user db/profile and userSlice state
    const handleSubmit = async (e) => {
        console.log("Running handleSubmit")
        try {
            e.preventDefault()
            const res = await axios.put(`/api/users/${currentUser._id}`, inputs)
            console.log(res.data)
            dispatch(loginSuccess(res.data))
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    // Reset previous imgUrl when user cancel
    const handleReset = (e) => {
        e.preventDefault()
        dispatch(loginSuccess(userHistory))
        navigate('/')
        window.location.reload()
    }




    // -------JSX Elements-----------





    return (
        <Container>
            <Wrapper onSubmit={handleSubmit} className='hero p-10 rounded-md max-md:flex-col max-md:p-6'>
                {/* Image  Section*/}
                <div className='flex gap-3 flex-col items-center'>
                    {/* Img */}
                    <Img src={currentUser.img} />
                    {/* hidden input file */}
                    <input required type="file" id='imgFile' name='imgFile' style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
                    {/* label */}
                    <label htmlFor="imgFile" className='text-sm cursor-pointer flex items-center gap-1 bg-[#008cff45] hover:bg-[#008cff32] px-4 py-2 rounded-full'>
                        <EditIcon fontSize='small' /> Change
                    </label>
                </div>

                <Info>
                    {/* Username */}
                    <label className='text-xl mb-4 flex flex-col gap-2'>Username
                        <Input
                            placeholder="name"
                            name='name'
                            value={userName}
                            required
                        />
                    </label>

                    {/* Email */}
                    <label className='text-xl mb-4  flex flex-col gap-2'>Email
                        <Input
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    {/* Save and Cancel */}
                    <div className='flex gap-8 w-full justify-center mt-5'>
                        <Button type='submit'>Save</Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </div>
                </Info>

            </Wrapper>
        </Container>
    )
}

export default EditProfile
