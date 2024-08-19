import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Comments from '../components/Comments';
import Card from '../components/Card';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import Loader from '../components/Loader';
import { subscription, loginSuccess } from '../redux/userSlice';
import Recommendations from '../components/Recommendations';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
display: flex;
gap: .75rem;
padding-top: 1.2rem;

@media (max-width:1004px){
    flex-direction: column;
    margin-top: 2rem;
}
`
const Content = styled.div`
flex:5;
`
const VideoWrapper = styled.div`
max-height:calc(35rem - 4vw);
/* object-fit: contain; */
border-radius: 10px;
overflow: hidden;
`
const VideoFrame = styled.video`
width: 100%;
height: auto;
object-fit: cover;
`

const Title = styled.h1`
font-size:18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
line-height: 20px;
color: ${({ theme }) => theme.text};
`

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

@media (max-width:1004px){
    flex-direction: column;
}
`

const Info = styled.div`
color: ${({ theme }) => theme.textSoft};
font-size:13px;
background-color: ${({ theme }) => theme.soft};
border-radius: 10px;
padding: 10px;
margin-top: 10px;
`

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
margin-right: 20px;


@media (max-width:1004px){
width: 100%;
justify-content: space-evenly;
padding-top:.5em;
}
`
const Button = styled.button``

const Hr = styled.hr`
margin: 14px 0px;
border: 0.2px solid ${({ theme }) => theme.soft};
`
const Channel = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: 25px;
/* background: red; */

@media (max-width:1004px){
width: 100%;
padding-right:.5em;
}
`

const ChannelInfo = styled.div`display: flex;
gap: 10px;
`

const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
`

const ChannelDetails = styled.div`
display:flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
font-weight: 500;
`
const ChannelCounter = styled.span` 
margin-top: 3px;
color: ${({ theme }) => theme.textSoft};
font-size: 12px;
`
const Subscribe = styled.button`
background-color: ${({ theme }) => theme.textSoft};
font-size: 12px;
font-weight: 500;
color: ${({ theme }) => theme.bg};
height: max-content;
padding: 8px 20px;
border:none;
border-radius: 24px;
cursor: pointer;
`
const CommentCounter = styled.div`
margin:20px 0px;
color: ${({ theme }) => theme.text};
font-size: 16px;
font-weight: 500;
`
const Description = styled.p`
font-size: 14px;
`

const Video = () => {
    const [loading, setLoading] = useState(true)
    const { currentUser } = useSelector((state) => state.user)
    const { currentVideo } = useSelector((state) => state.video)
    const dispatch = useDispatch()
    const { id } = useParams() // id of the video
    const [channel, setChannel] = useState({})
    const [totalComments, setTotalComments] = useState(0)
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const viewsRes = await axios.put(`/api/videos/view/${id}`);
                const videoRes = await axios.get(`/api/videos/find/${id}`);
                const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
                const CurrentUserRes = await axios.get(`/api/users/find/${currentUser._id}`);

                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data)); //currentVideo is a property of this action
                dispatch(loginSuccess(CurrentUserRes.data));
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, dispatch]);

    !currentUser && navigate('/Signin')

    const handleLike = async () => {
        await axios.put(`/api/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
        // Since, we need to reload the page, to make changes visible so we used Redux toolkit actions
    }

    const handleDislike = async () => {
        await axios.put(`/api/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
        // Since, we need to reload the page, to make changes visible so we used Redux toolkit actions
    }

    const handleSub = async () => {
        await currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/api/users/unsub/${channel._id}`)
            : await axios.put(`/api/users/sub/${channel._id}`)
        dispatch(subscription(channel._id))
    }

    // -------JSX Elements-----------
    return (
        <>
            {loading ? (<Loader />) : (
                < Container >
                    <Content>
                        {/* Video */}
                        <VideoWrapper  >
                            <VideoFrame
                                src={currentVideo.videoUrl}
                                controls
                                autoPlay
                            />
                        </VideoWrapper>

                        {/* Video Title */}
                        <Title>{currentVideo.title}</Title>
                        <Details>
                            <Channel>
                                <ChannelInfo>
                                    <Image src={channel.img} />
                                    <ChannelDetails>
                                        <ChannelName> {channel.name} </ChannelName>
                                        <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                                    </ChannelDetails>
                                </ChannelInfo>

                                <Subscribe onClick={handleSub}>{currentUser.subscribedUsers.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                                </Subscribe>
                            </Channel>

                            <Buttons>
                                {/* Like btn */}
                                <Button onClick={handleLike}>
                                    {currentVideo.likes.includes(currentUser._id) ? (<ThumbUpIcon fontSize="small" />) : (<ThumbUpOutlinedIcon fontSize="small" />)}{" "} {currentVideo.likes.length}
                                </Button>
                                {/* Dislike btn */}
                                <Button onClick={handleDislike}>
                                    {currentVideo.dislikes.includes(currentUser._id) ? (<ThumbDownIcon fontSize="small" />) : (<ThumbDownOutlinedIcon fontSize="small" />)}{" "} {currentVideo.dislikes.length}
                                </Button>
                                <Button>
                                    <ReplyIcon fontSize="small" /> Share
                                </Button>
                                <Button>
                                    <AddTaskIcon fontSize="small" /> Save
                                </Button>
                            </Buttons>
                        </Details>

                        <Info >
                            {/* Views and Created Time */}
                            {currentVideo.views} views • {format(currentVideo.createdAt)}
                            <Description>
                                {currentVideo.desc}
                            </Description>
                        </Info>

                        <CommentCounter>
                            {totalComments} Comments
                        </CommentCounter>

                        <Comments videoId={currentVideo._id} setTotalComments={setTotalComments} />

                    </Content >

                    <Recommendations tags={currentVideo.tags} />

                </Container >
            )}
        </>
    )
}
export default Video
