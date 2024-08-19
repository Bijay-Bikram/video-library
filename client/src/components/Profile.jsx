import React from 'react'
import styled from 'styled-components'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useSelector } from 'react-redux';
import { persistor } from '../redux/store.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 300px;
background: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
display: flex;
flex-direction: column;
justify-content: center;
position: fixed;
top: 53px;
right: 0;
border-bottom-left-radius: 10px;
padding: 20px 0px;
box-shadow: ${({ theme }) => theme.shadow}  0px 2px 8px 0px;
z-index: 999;
`

const Item = styled.div`
 display: flex;
 align-items: center;
 gap:.8rem;
 margin-bottom: .5rem;
 cursor: pointer;
 padding: 5px 20px ;
 border-radius: 10px;
 &:hover{
    background-color: ${({ theme }) => theme.soft};
 }
`
const Img = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`
const Info = styled.div`
display: flex;
flex-direction: column;
`
const Name = styled.div`
`
const Email = styled.div`
`
const Hr = styled.div`
 margin: 15px 0px;
 border: 0.2px solid ${({ theme }) => theme.soft};
`

const Profile = ({ DarkMode, setDarkMode }) => {
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate();

    //Logout
    const handleLogout = () => {
        persistor.pause();
        persistor.flush().then(() => {
            return persistor.purge();
        });
        navigate('/')
        window.location.reload()
    }

    // -------JSX Elements-----------
    return (
        <Container>
            {/* Profile section */}
            <div className='flex gap-3 px-5 '>
                <Img src={currentUser.img} />
                <Info>
                    <Name>{currentUser.name}</Name>
                    <Email>{currentUser.email}</Email>
                    <p className='text-sm mt-3 text-blue-500 cursor-pointer' onClick={() => navigate('/editprofile')}>Customize profile</p>
                </Info>
            </div>
            <Hr />

            {/* Video Settings */}
            <Item onClick={() => navigate('/uservideos')}>
                <VideoSettingsIcon fontSize="small" />
                Your Videos
            </Item>

            {/* Log Out */}
            <Item onClick={handleLogout}>
                <ExitToAppIcon fontSize="small" />
                Log Out
            </Item>

            {/* Theme */}
            <Item onClick={() => setDarkMode(!DarkMode)} id='d_l_m'>
                <SettingsBrightnessIcon fontSize="small" />
                {DarkMode ? 'Light' : 'Dark'} Mode
            </Item>
        </Container>
    )
}

export default Profile
