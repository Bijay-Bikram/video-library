import React, { useState } from 'react'
import styled from 'styled-components'
import OtherLinks from '../components/OtherLinks'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
min-height: calc(100vh - 53px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px 40px;
border-radius: 5px;
gap: 10px;
`

const Title = styled.h1`
font-size: 24px;
`

const SubTitle = styled.h2`
font-size:20px;
font-weight: 300;
`

const Input = styled.input`
border:1px solid ${({ theme }) => theme.soft};
border-radius:3px;
padding: 10px;
background-color:transparent;
width: 100%;
`

const Button = styled.button`
border-radius: 24px;
font-size: 14px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color:${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
`
const Marker = styled.span`
border-bottom: 1px solid ${({ theme }) => theme.softLigth};
margin-left: 5px;
`

const SignIn = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // We can't directly use useNavigate(), because it's not a function but a hook.

    const handleLogin = async (e) => {
        e.preventDefault() // prevents the page from refreshing
        dispatch(loginStart())
        try {
            const res = await axios.post("/api/auth/signin", { name, password })
            dispatch(loginSuccess(res.data)) // Store user data in redux store
            navigate('/')
        } catch (error) {
            dispatch(loginFailure())
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    // -------JSX Elements-----------
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <SubTitle>To continue to YouTube</SubTitle>
                <Input placeholder='username' name='name' onChange={(e) => setName(e.target.value)} />
                <Input type='password' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>

                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                <Title>or</Title>

                <Link to={'/signup'}>
                    Don't have an account?<Marker>Sign Up</Marker>
                </Link>
            </Wrapper>
            <OtherLinks />
        </Container>
    )
}

export default SignIn
