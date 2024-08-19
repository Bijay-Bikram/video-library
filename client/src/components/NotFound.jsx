import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height: calc(100vh - 53px);
display: flex;
justify-content: center;
align-items: center;
color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
padding: 0 6rem;`

const NotFound = () => {
    const params = new URLSearchParams(window.location.search);
    const searched_q = params.get('q');

    // -------JSX Elements-----------
    return (
        <Container>
            <Wrapper>
                <h1 className='text-3xl'>"{searched_q}" <span className='text-red-500'>Not Found</span> 🤔</h1>
            </Wrapper>
        </Container>
    )
}

export default NotFound
