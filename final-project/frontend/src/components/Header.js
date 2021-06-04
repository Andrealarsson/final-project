import React from 'react'
import styled from 'styled-components/macro'

const Header = () =>  {

  return(
    <>
    <Title>Travel Pocket</Title>
    </>
  )
}

export default Header

const Title = styled.h1`
background: linear-gradient(to right, #EC3B37 50%, #CB1A16 80%);
opacity: 0.8;
 color: white;
 margin: 0px; 
 height: 15vh;
 display: flex;
 justify-content: center;
 align-items: center;
 `