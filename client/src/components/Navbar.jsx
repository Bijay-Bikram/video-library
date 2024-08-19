import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Upload from './Upload';
import VideoLab from '../assets/logo1.png';
import Profile from './Profile';
import WidgetsIcon from '@mui/icons-material/Widgets';

const Container = styled.div`
position:sticky;
top:0;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
height:53px;
z-index: 100;

@media (max-width:640px){
    height: 53px;
}
`
const Wrapper = styled.div`
background-color: ${({ theme }) => theme.bgLighter};
`
const NavWrapper = styled.div`
display: flex;
align-items: center;
height:100%;
padding: 10px 20px;
justify-content: flex-end;
position:relative;

@media (max-width:640px) {
 justify-content: space-between;
}
`
const Logo = styled.div`
display: flex;
align-items: center;
gap:5px;
font-weight: bold;
/* padding: 18px 20px ; */
color: ${({ theme }) => theme.text};
`
const Img = styled.img`
height: 20px;
`
const Search = styled.div`

`
const Input = styled.input`
width: 100%;
padding: 5px 15px;
outline: 0;
background-color: transparent;
color: ${({ theme }) => theme.text};
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
 display: flex;
 align-items: center;
 gap: 5px;
`

const SIcon = styled.button`
 height: 2.1rem;
 width:2.6rem;
 display: flex;
 align-items: center;
 justify-content: center;
 background:${({ theme }) => theme.soft};
 color: ${({ theme }) => theme.text};
`
const User = styled.div`
display: flex;
align-items: center;
gap: 1em;
font-weight: 500;
color: ${({ theme }) => theme.text};
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
cursor: pointer;
`
const Navbar = ({ setIsOpen, isOpen, DarkMode, setDarkMode }) => {
    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [q, setQ] = useState('')
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()

    // Hide Profile Settings on click outside
    document.addEventListener("click", (e) => {
        if (e.target.id !== "profile") {
            setOpenProfile(false)
        }

        if (e.target.id !== "hamburger") {
            setIsOpen(false)
        }
    })


    // -------JSX Elements-----------
    return (
        <>
            <Container>
                <Wrapper className='flex flex-col justify-center w-full'>
                    <NavWrapper>
                        <div className='flex items-center'>
                            {/* Hamburger */}
                            <WidgetsIcon onClick={() => setIsOpen(!isOpen)} className='ml-1 cursor-pointer' id="hamburger" />

                            {/* Logo */}
                            <Link to={'/'} className='text-decoration-none'>
                                <Logo className='text-xs pl-2'>
                                    <Img src={VideoLab} />
                                    <h1>VideoLab</h1>
                                </Logo>
                            </Link>
                        </div>

                        {/* Search section */}
                        <Search className='flex items-center justify-center border-[1px] rounded-full border-gray-500 overflow-hidden max-sm:hidden  w-[40%] m-auto '>
                            <Input
                                placeholder='Search'
                                name='search'
                                onChange={(e) => setQ(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        navigate(`/search?q=${q}`);
                                    }
                                }}
                            />
                            <SIcon >
                                <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
                            </SIcon>
                        </Search>

                        {/* Upload and Profile section */}
                        {currentUser ? (
                            <User>
                                <VideoCallIcon onClick={() => setOpen(true)} className='cursor-pointer' />
                                <Avatar onClick={() => setOpenProfile(!openProfile)} src={currentUser.img} id='profile' />
                            </User>
                        ) :
                            (<Link to={'/signin'}>
                                <Button>
                                    <AccountCircleIcon />
                                    SIGN IN
                                </Button>
                            </Link>
                            )}
                    </NavWrapper>
                    {/* Search section for small screen */}
                    <div className={`${DarkMode ? ' bg-black ' : 'bg-gray-200 '} py-1 px-2 sm:hidden  `}>
                        <Search className='flex items-center justify-center border-[1px] rounded-full border-gray-500 overflow-hidden w-full h-7 m-auto '>
                            <Input
                                placeholder='Search'
                                name='search'
                                onChange={(e) => setQ(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        navigate(`/search?q=${q}`);
                                    }
                                }}
                            />
                            <SIcon >
                                <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
                            </SIcon>
                        </Search>
                    </div>
                </Wrapper>
            </Container>


            {/* Upload Form */}
            {open && <Upload setOpen={setOpen} />}

            {/* Profile Settings */}
            {openProfile && <Profile DarkMode={DarkMode} setDarkMode={setDarkMode} />}
        </>
    )
}

export default Navbar
