import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
margin: 10px 0px;
`

const More = styled.div`
display:flex;
font-size:10px;
color: ${({ theme }) => theme.textSoft};
`

const Link = styled.div`
margin-left: 15px;
`

const Links = styled.div`
display: flex;
margin-left: 20px;
cursor: pointer;
`

const OtherLinks = () => {

    // -------JSX Elements-----------
    return (
        <Container>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default OtherLinks
