import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Container = styled.div`
overflow: hidden;
position: relative;
padding: .5rem;
border-radius: .5rem;
text-overflow: ellipsis;

@media (max-width:1004px){
    max-height: ${({ showcomments }) => (showcomments ? "auto" : "4.2rem")};    
    background: ${({ theme }) => theme.soft};
}
`
const NewComment = styled.div`
 
`

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
`

const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.softLight};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
`

const Comments = ({ videoId, setTotalComments }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showcomments, setShowComments] = useState(false);


    // Fetch Comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/api/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchComments();
    }, [videoId]);

    // Set Total Comments
    useEffect(() => {
        if (comments) {
            setTotalComments(comments.length);
        }
    }, [comments]);

    // Add new Comment
    const handleNewComment = async () => {
        try {
            const res = await axios.post(`/api/comments/${videoId}`, {
                desc: newComment,
            });
            setComments((prev) => [...prev, res.data]);
            setNewComment("");
        } catch (err) {
            console.log(err);
        }
    };

    const zeroComment = comments.length === 0;


    // -------JSX Elements-----------
    return (
        <Container showcomments={showcomments}>
            {/* Write comments */}
            <NewComment
                showcomments={showcomments}
                comments={zeroComment}
                className={`flex gap-[10px] mb-[3rem] ${showcomments ? " max-[1004px]:flex " : zeroComment ? " max-[1004px]:flex " : " max-[1004px]:hidden "} `}
            >
                <Avatar src={currentUser.img} />
                <Input
                    placeholder='Add a comment...'
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleNewComment();
                        }
                    }}
                />
            </NewComment>

            {/* Comments */}
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}

            {/* Show/Hide comments */}
            {comments.length !== 0 && (<div onClick={() => setShowComments(!showcomments)} className='absolute bottom-1 right-2 hidden max-[1004px]:block cursor-pointer text-sm text-blue-500'>{showcomments ? 'Show less' : 'Show more...'}</div>)}
        </Container>
    )
}

export default Comments
