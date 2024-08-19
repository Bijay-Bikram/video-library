import React, { useEffect, useRef } from 'react'
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
 /* flex: .5; // this is 20% of the screen */
 width:5rem;
 background:${({ theme }) => theme.bgLighter};
 color: ${({ theme }) => theme.text};
 height: calc(100vh - 53px);
 font-size: .8rem;
 overflow-y: auto;
 position: sticky;
 top:53px;
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
 margin-bottom: 10px;
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
const Menu = ({ DarkMode, setDarkMode }) => {
    const ref = useRef(null);
    const { currentUser } = useSelector((state) => state.user)

    // -------JSX Elements-----------
    return (
        <Container ref={ref} className='scrollbar-none h-32 overflow-y-scroll hidden sm:block'>
            <Wrapper>
                <Link to={'/'}>
                    <Item className="flex flex-col text-xs">
                        <HomeIcon fontSize="medium" />
                        Home
                    </Item>
                </Link>

                <Link to={'trends'} className='text-decoration-none'>
                    <Item className="flex flex-col text-xs">
                        <ExploreIcon fontSize="medium" />
                        Explore
                    </Item>
                </Link>

                <Link to={'subscriptions'} className='text-decoration-none'>
                    <Item className="flex flex-col text-xs">
                        <SubscriptionsIcon fontSize="medium" />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />

                <Item className="flex flex-col text-xs">
                    <VideoLibraryIcon fontSize="medium" />
                    Library
                </Item>
                <Item className="flex flex-col text-xs">
                    <HistoryIcon fontSize="medium" />
                    History
                </Item>
                <Hr />

                {!currentUser &&
                    <>
                        <Login>
                            {/* Sign in to like videos, comment, and subscribe. */}
                            <Link to={'/signin'} className='text-decoration-none'>
                                <Button className="flex flex-col text-xs">
                                    <AccountCircleIcon fontSize="medium" /> SIGN IN
                                </Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>}
                <Title className='text-center'>BEST OF VIDEO LAB</Title>
                <Item className="flex flex-col text-xs">
                    <LibraryMusicIcon fontSize="medium" />
                    Music
                </Item>
                <Item className="flex flex-col text-xs">
                    <SportsSoccerIcon fontSize="medium" />
                    Sports
                </Item>
                <Item className="flex flex-col text-xs">
                    <SportsEsportsIcon fontSize="medium" />
                    Gaming
                </Item>
                <Item className="flex flex-col text-xs">
                    <MovieIcon fontSize="medium" />
                    Movies
                </Item>
                <Item className="flex flex-col text-xs">
                    <NewspaperIcon fontSize="medium" />
                    News
                </Item>
                <Item className="flex flex-col text-xs">
                    <LiveTvIcon fontSize="medium" />
                    Live
                </Item>
                <Hr />

                <Item className="flex flex-col text-xs">
                    <SettingsIcon fontSize="medium" />
                    Settings
                </Item>
                <Item className="flex flex-col text-xs">
                    <FlagIcon fontSize="medium" />
                    Report
                </Item>
                <Item className="flex flex-col text-xs">
                    <HelpIcon fontSize="medium" />
                    Help
                </Item>
                {!currentUser &&
                    <Item onClick={() => setDarkMode(!DarkMode)} className="flex flex-col text-xs">
                        <SettingsBrightnessIcon fontSize="medium" />
                        {DarkMode ? 'Light' : 'Dark'} Mode
                    </Item>}

            </Wrapper>
        </Container>
    )
}

export default Menu
