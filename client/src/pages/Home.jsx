import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

const Container = styled.div`
 
`
const CardContainer = styled.div`

`
const Home = ({ type }) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/videos/${type}`)
                const data = await res.data
                setVideos(data)
                // console.log("video", data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [type])


    // -------JSX Elements-----------
    return (
        <>
            {/* Show total number of videos in user Video page */}
            {type === "user" && (
                <h2 className='my-3 max-sm:mt-10 max-sm:text-center'> Videos : {videos.length}</h2>
            )}

            <Container type={type} className=' flex justify-center min-h-[100vh]' >
                <CardContainer
                    className={`grid gap-4  
                    ${type === "user" ? "place-items-center grid-cols-1  w-full h-fit"
                            : " sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-sm:my-[3rem] max-sm:p-2 sm:my-[20px] mx-auto"} `}
                >
                    {videos.map((video,) => (
                        <Card type={type === "user" && "hr"} key={video._id} video={video} />
                    ))}
                </CardContainer>
            </Container>
        </>
    )
}
export default Home

