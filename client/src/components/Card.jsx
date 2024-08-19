import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteModal from './DeleteModal'


const Container = styled.div`
/* background-color: green; */
overflow: hidden;
font-family: 'Roboto',sans-serif;  
display:${({ type }) => type === "sm" ? "flex" : (type === "hr" && "flex")};
margin-bottom:${({ type }) => type === "sm" ? "9px" : "30px"};
gap: ${({ type }) => type === "hr" && "1rem"};
position:relative;
text-overflow: ellipsis;
`
const Img = styled.img`
width: ${({ type }) => type === "sm" ? "40%" : (type === "hr" ? "35%" : "100%")};
max-width: 30rem;
height: ${({ type }) => type === "sm" ? "auto" : ("cal(1rem + 1vw) ")};
border-radius: ${({ type }) => type === "sm" ? "5px" : "10px"};
background-color: #999;
margin-right:${({ type }) => type === "sm" && "10px"};
/* flex:1.5; */

@media (max-width:540px){
    width: ${({ type }) => type === "hr" && "100%"};
}
`
const Details = styled.div`
display: flex;
margin-top: ${({ type }) => type !== "sm" && "16px"};
gap: 12px;
flex:2;
`
const ChannelImg = styled.img`
width: ${({ type }) => type === "hr" ? "30px" : "36px"};
height: ${({ type }) => type === "hr" ? "30px" : "36px"};
border-radius: 50%;
background-color: #999;
display: ${({ type }) => type === "sm" && "none"}
`
const Text = styled.div`
`
const Title = styled.h2`
font-size: ${({ type }) => type === "sm" ? ".6rem" : "16px"};
font-weight: 500;
color: ${({ theme }) => theme.text};
text-transform: capitalize;

@media (max-width:1004px){
    font-size: ${({ type }) => type === "sm" ? "2vh" : "16px"};
}
`
const ChannelName = styled.p`
font-size: ${({ type }) => type === "sm" ? "11px" : "14px"};
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-top: 5px;
line-height: 20px;
text-overflow: ellipsis;
`
const Info = styled.p`
font-size:  ${({ type }) => type === "sm" ? "11px" : "14px"};
color: ${({ theme }) => theme.textSoft};
`

const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({})
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/users/find/${video.userId}`)
                const data = await res.data
                setChannel(data)
            } catch (error) {
            }
        }
        fetchData()
    }, [video])

    const handleClick = () => {
        navigate(`/video/${video._id}`)
    }

    // -------JSX Elements-----------
    return (
        <>
            <Container type={type} className={`sm:w-full w-[90%] m-auto ${type === "hr" ? " max-[540px]:flex-col " : " "} `}>

                <Img type={type} src={video.imgUrl} onClick={handleClick} />

                <Details type={type}>
                    {type !== "hr" && <ChannelImg type={type} src={channel.img} />}
                    <Text>
                        {/* Video Title */}
                        <Title type={type} >{video.title}</Title>

                        {/* Channel Name or Image*/}
                        {type === "hr" ?
                            (<div className='flex gap-2 my-2'>
                                <ChannelImg type={type} src={channel.img} />
                                <ChannelName type={type}>{channel.name}</ChannelName>
                            </div>)
                            : (<ChannelName type={type}>{channel.name}</ChannelName>)}

                        {/* Views & Created Time */}
                        <Info type={type} >{video.views} views • {format(video.createdAt)}</Info>
                    </Text>
                </Details>

                {/* Edit and Delete button */}
                {type === "hr" &&
                    (<div className='flex gap-10  mx-3 absolute bottom-3 right-2 max-[540px]:gap-4 max-[540px]:bottom-6 max-[540px]:right-0'>
                        <EditIcon onClick={() => navigate(`/uvideo/${video._id}`)} fontSize='small' className='cursor-pointer' />
                        <DeleteIcon fontSize='small' onClick={() => setShowModal(!showModal)} className='cursor-pointer' />
                    </div>)
                }
            </Container>

            {/* Modals */}
            {showModal && <DeleteModal setShowModal={setShowModal} videoId={video._id} />}
        </>
    )
}

export default Card

