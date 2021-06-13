import React from 'react'
import styled from 'styled-components/macro'
import LogOutButton from '../components/LogOutButton'
import Navbar from 'components/Navbar'

const Header = () =>  {

  return(
    <>
    <HeaderContainer>
      <Title>Travel Pocket</Title>
      <LogOutButton>Log out</LogOutButton>
    </HeaderContainer>
    <Navbar/>
    </>
  )
}

export default Header

const HeaderContainer = styled.div`
background: linear-gradient(to right, #EC3B37 50%, #CB1A16 80%);
opacity: 0.8;
display: flex;
justify-content: space-between;
align-items: center;
`
const Title = styled.h1`

 color: white;
 margin: 0px; 
 height: 15vh;
 display: flex;

 `