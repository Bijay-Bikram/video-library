import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import VideoLab from '../assets/logo1.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useSelector } from 'react-redux'


const Container = styled.div`
 flex: 1.1; // this is 20% of the screen
 background:${({ theme }) => theme.bgLighter};
 color: ${({ theme }) => theme.text};
 height: calc(100vh - 53px);
 font-size: 14px;
 overflow-y: auto;
 position: fixed;
 top:53px;
 z-index: 9999;
`
const Wrapper = styled.div` 
padding: 18px 10px ;
`
const Item = styled.div`
 display: flex;
 align-items: center;
 gap:.3rem;
 margin-bottom: .5rem;
 cursor: pointer;
 padding: 5px 20px ;
 border-radius: 10px;
 &:hover{
    background-color: ${({ theme }) => theme.soft};
 }
`
const Hr = styled.div`
 margin: 15px 0px;
 border: 0.2px solid ${({ theme }) => theme.soft};
`
const Login = styled.div`
 /* margin-bottom: 10px; */
`
const Button = styled.button`
 padding: 5px 15px;
 background-color: transparent;
 border: 1px solid #3ea6ff;
 text-align: center;
 color: #3ea6ff;
 border-radius: 16px;
 font-size: 10px;
 font-weight: 400;
 cursor: pointer;
 margin-top: 10px;
 display: flex;
 align-items: center;
 gap: 5px;
`
const Title = styled.h1`
font-size: 12px;
font-weight: 500;
color:#aaaaaa;
margin-bottom: 20px;
`
const RespMenu = ({ DarkMode, setDarkMode }) => {
    const ref = useRef(null);
    const { currentUser } = useSelector((state) => state.user)



    // -------JSX Elements-----------
    return (
        <Container ref={ref} className='scrollbar-none h-32 overflow-y-scroll ' >
            <Wrapper>
                <Link to={'/'}>
                    <Item>
                        <HomeIcon fontSize="small" />
                        Home
                    </Item>
                </Link>

                <Link to={'trends'} className='text-decoration-none'>
                    <Item>
                        <ExploreIcon fontSize="small" />
                        Explore
                    </Item>
                </Link>

                <Link to={'subscriptions'} className='text-decoration-none'>
                    <Item>
                        <SubscriptionsIcon fontSize="small" />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />

                <Item>
                    <VideoLibraryIcon fontSize="small" />
                    Library
                </Item>
                <Item>
                    <HistoryIcon fontSize="small" />
                    History
                </Item>
                <Hr />

                {!currentUser &&
                    <>
                        <Login >
                            <Link to={'/signin'} className='text-decoration-none'>
                                <Button>
                                    <AccountCircleIcon fontSize="small" /> SIGN IN
                                </Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>}
                <Title className='text-center'>BEST OF VIDEO LAB</Title>
                <Item>
                    <LibraryMusicIcon fontSize="small" />
                    Music
                </Item>
                <Item>
                    <SportsSoccerIcon fontSize="small" />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsIcon fontSize="small" />
                    Gaming
                </Item>
                <Item>
                    <MovieIcon fontSize="small" />
                    Movies
                </Item>
                <Item>
                    <NewspaperIcon fontSize="small" />
                    News
                </Item>
                <Item>
                    <LiveTvIcon fontSize="small" />
                    Live
                </Item>
                <Hr />

                <Item>
                    <SettingsIcon fontSize="small" />
                    Settings
                </Item>
                <Item>
                    <FlagIcon fontSize="small" />
                    Report
                </Item>
                <Item>
                    <HelpIcon fontSize="small" />
                    Help
                </Item>
                {!currentUser &&
                    <Item onClick={() => setDarkMode(!DarkMode)}>
                        <SettingsBrightnessIcon fontSize="small" />
                        {DarkMode ? 'Light' : 'Dark'} Mode
                    </Item>}

            </Wrapper>
        </Container>
    )
}

export default RespMenu
