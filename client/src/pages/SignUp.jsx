import React, { useState } from 'react'
import styled from 'styled-components'
import OtherLinks from '../components/OtherLinks'
import axios from 'axios'

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

const SignUp = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault() // prevents the page from refreshing
        try {
            const res = await axios.post("/api/auth/signup", { name, email, password })
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // -------JSX Elements-----------
    return (
        <Container>
            <Wrapper>
                <Title>SIGN UP</Title>
                <SubTitle>Create your account</SubTitle>
                <Input placeholder='username' name='name' type='text' onChange={(e) => setName(e.target.value)} />
                <Input placeholder='email' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignup}>Sign Up</Button>
            </Wrapper>
            <OtherLinks />
        </Container>
    )
}

export default SignUp
