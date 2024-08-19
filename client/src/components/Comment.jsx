import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import axios from 'axios'


const Container = styled.div`
display: flex;
margin-bottom: 1.5rem;
`
const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;`

const Details = styled.div`
display: flex;
flex-direction: column;
margin-left: 12px;
color: ${({ theme }) => theme.text};
`
const Name = styled.span`
font-size:13px;
font-weight: 500;
`
const Date = styled.span`
font-size: 12px;
font-weight:400px;
color: ${({ theme }) => theme.textSoft};
`
const Text = styled.span`
font-size: 13px;`

const Comment = ({ comment }) => {
    const [channel, setChannel] = useState({})

    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get(`/api/users/find/${comment.userId}`)
            setChannel(res.data)
        }
        fetchComment()
    }, [comment])

    // -------JSX Elements-----------
    return (
        <Container>
            <Avatar src={channel.img} />
            <Details>
                <Name>
                    {channel && channel.name}<Date> {format(comment.createdAt)}</Date>
                </Name>
                <Text>
                    {comment.desc}
                </Text>
            </Details>
        </Container>
    )
}

export default Comment

