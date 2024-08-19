import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import NotFound from '../components/NotFound'
import Loader from '../components/Loader'

const Container = styled.div`
   
`
const CardContainer = styled.div`

`

const Search = () => {
    const [videos, setVideos] = useState([])
    const query = useLocation().search;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/api/videos/search${query}`)
            setVideos(res.data)
            setLoading(false)
        }
        fetchVideos()
    }, [query])

    // -------JSX Elements-----------
    return (
        <>

            {
                loading ? <Loader />
                    : (videos.length === 0 ?
                        // Not found page
                        (<NotFound searched_q={query} />)
                        :
                        // className = 'grid  place-items-center max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  max-sm:my-[3rem] max-sm:p-2 sm:my-[20px]  max-sm:min-h-[80vh]  mx-auto bg-red-500'


                        (<Container className='flex justify-center items-start min-h-screen mt-12 '>
                            <CardContainer className="grid place-items-center gap-5 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]  w-full">
                                {
                                    videos.map((video) => (
                                        <Card key={video._id} video={video} />
                                    ))
                                }
                            </CardContainer>
                        </Container>))
            }
        </>
    )
}

export default Search
