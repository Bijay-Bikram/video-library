import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Search from './pages/Search'
import EditProfile from './pages/EditProfile'
import UpdateVideo from './pages/UpdateVideo'
import RespMenu from './components/RespMenu'

const Container = styled.div`
 display: flex;
 flex-direction: column;
`
const Main = styled.div`
background:${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
display: flex;
`
const Wrapper = styled.div`
flex:7; // this is 70% of the screen
padding: 0 10px;
`

const App = () => {
  const [DarkMode, setDarkMode] = useState(true)
  const [isOpen, setIsOpen] = useState(false)


  return (
    <ThemeProvider theme={DarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setIsOpen={setIsOpen} isOpen={isOpen} DarkMode={DarkMode} setDarkMode={setDarkMode} />

          <Main>
            {/* Left side menu */}
            <Menu DarkMode={DarkMode} setDarkMode={setDarkMode} />
            {isOpen && (<RespMenu DarkMode={DarkMode} setDarkMode={setDarkMode} />)}
            <Wrapper>
              <Routes>
                <Route exact path='/'>
                  <Route index element={<Home type='random' />} />
                  <Route path='trends' element={<Home type='trend' />} />
                  <Route path='subscriptions' element={<Home type='sub' />} />
                  <Route path='uservideos' element={<Home type='user' />} />

                  <Route path='signin' element={<SignIn />} />
                  <Route path='signup' element={<SignUp />} />

                  <Route path='video'> {/* This means "/video/:id "*/}
                    <Route path=':id' element={<Video />} />
                  </Route>

                  <Route path='uvideo/:id' element={<UpdateVideo />} />

                  <Route path='search' element={<Search />} />

                  <Route path='editprofile' element={<EditProfile />} />

                </Route>
              </Routes>
            </Wrapper>
          </Main>

        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

